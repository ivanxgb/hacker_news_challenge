import { HitsModel } from "@/service/models/HitsModel";
import { create } from "zustand";
import { FavesLocalStorage } from "@/service/local-storage/faves-local-storage";

type FavesStore = {
  news: HitsModel[];
  isSaved: (news: HitsModel) => boolean;
  removeNews: (news: HitsModel) => void;
  saveNews: (news: HitsModel) => void;
};

// key to save news in local storage
const key = "faves";

// useFavesStore is a zustand store that manages news saved in local storage (faves)
// it communicates with FavesLocalStorage class to save, remove and check if news is already saved
export const useFavesStore = create<FavesStore>((set) => ({
  news: FavesLocalStorage.getInstance(key).savedNews,
  isSaved: (news: HitsModel) =>
    FavesLocalStorage.getInstance(key).hasNews(news),
  removeNews: (news: HitsModel) => {
    FavesLocalStorage.getInstance(key).removeNews(news);
    set({
      news: FavesLocalStorage.getInstance(key).savedNews,
    });
  },
  saveNews: (news: HitsModel) => {
    FavesLocalStorage.getInstance(key).saveNews(news);
    set({
      news: FavesLocalStorage.getInstance(key).savedNews,
    });
  },
}));
