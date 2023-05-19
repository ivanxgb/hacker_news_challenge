import { create } from "zustand";

import { getHackerNews } from "@/service/requester/api";
import { HitsModel } from "@/service/models/HitsModel";
import { NewsLocalStorage } from "@/service/local-storage/news-local-storage";

type NewsStore = {
  news: HitsModel[];
  newsSearchTerm: string;
  newsPage: number;
  setNewsSearchTerm: (searchTerm: string) => void;
  incrementPage: () => void;
  getNews: (queryTerm: string) => void;
};

const key = "news-filter";

// create store using zustand library for global state management
// this store manages news and news search term
// it communicates with NewsLocalStorage class to save and get news search term
// it communicates with getHackerNews function to get news from API
export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  newsSearchTerm: NewsLocalStorage.getInstance(key).getFilterSelected(),
  newsPage: 0,
  getNews: async (queryTerm: string) => {
    const response = await getHackerNews(queryTerm, get().newsPage);
    const hits = cleanInvalidHits(response?.hits);

    set({ news: [...get().news, ...hits] });
  },
  setNewsSearchTerm: (searchTerm: string) => {
    set({ newsSearchTerm: searchTerm, newsPage: 0, news: [] });
    NewsLocalStorage.getInstance(key).saveFilterSelected(searchTerm);
  },
  incrementPage: () => set({ newsPage: get().newsPage + 1 }),
}));

// receive hits and remove invalid hits (story_url, story_title and created_at must not be null)
const cleanInvalidHits = (hits?: HitsModel[]): HitsModel[] => {
  if (!hits) return [];
  return hits.filter(
    (hit) =>
      hit.story_url !== null &&
      hit.story_title !== null &&
      hit.created_at !== null,
  );
};
