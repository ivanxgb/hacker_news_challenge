import { create } from "zustand";

import { getHackerNews } from "@/service/requester/api";
import { HitsModel } from "@/service/models/HitsModel";

type NewsStore = {
  news: HitsModel[];
  newsSearchTerm: string;
  newsPage: number;
  setNewsSearchTerm: (searchTerm: string) => void;
  incrementPage: () => void;
  getNews: (queryTerm: string) => void;
};

// create store using zustand library for global state management
export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  newsSearchTerm: "",
  newsPage: 0,
  getNews: async (queryTerm: string) => {
    const response = await getHackerNews(queryTerm, get().newsPage);
    const hits = cleanInvalidHits(response?.hits);

    set({ news: [...get().news, ...hits] });
  },
  setNewsSearchTerm: (searchTerm: string) =>
    set({ newsSearchTerm: searchTerm, newsPage: 0, news: [] }),
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
