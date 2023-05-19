import { HitsModel } from "@/service/models/HitsModel";
import { create } from "zustand";
import { LocalStorage } from "@/service/local-storage/local-storage";

type FavesStore = {
  news: HitsModel[];
  isSaved: (news: HitsModel) => boolean;
  removeNews: (news: HitsModel) => void;
  saveNews: (news: HitsModel) => void;
};

// key to save news in local storage
const key = "faves";

// useFavesStore is a zustand store that manages news saved in local storage (faves)
// it communicates with LocalStorage class to save, remove and check if news is already saved
export const useFavesStore = create<FavesStore>((set) => ({
  news: [],
  getAll: () => LocalStorage.getInstance(key).getAll(),
  isSaved: (news: HitsModel) => LocalStorage.getInstance(key).hasNews(news),
  removeNews: (news: HitsModel) => {
    LocalStorage.getInstance(key).removeNews(news);
    set({
      news: LocalStorage.getInstance(key).getAll(),
    });
  },
  saveNews: (news: HitsModel) => {
    LocalStorage.getInstance(key).saveNews(news);
    set({
      news: LocalStorage.getInstance(key).getAll(),
    });
  },
}));
