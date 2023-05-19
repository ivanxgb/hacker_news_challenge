import { create } from "zustand";

import { getHackerNews } from "@/service/requester/api";
import { HitsModel } from "@/service/models/HitsModel";

type NewsStore = {
  news: HitsModel[];
  getNews: (queryTerm: string) => void;
};

// create store using zustand library for global state management
export const useNewsStore = create<NewsStore>((set) => ({
  news: [],
  getNews: async (queryTerm: string) => {
    const response = await getHackerNews(queryTerm);
    const hits = cleanInvalidHits(response?.hits);
    set({ news: hits });
  },
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
