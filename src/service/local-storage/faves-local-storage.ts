import { HitsModel } from "@/service/models/HitsModel";

// Class to manage local storage interactions
export class FavesLocalStorage {
  private static instance: FavesLocalStorage;

  private readonly _savedNews: HitsModel[] = [];

  private constructor(private readonly key: string) {
    this._savedNews = this.getAllFromLocalStorage();
  }

  // getter for saved news
  public get savedNews(): HitsModel[] {
    return this._savedNews;
  }

  // get instance of FavesLocalStorage using singleton pattern
  public static getInstance(key: string): FavesLocalStorage {
    if (!FavesLocalStorage.instance || FavesLocalStorage.instance.key !== key) {
      FavesLocalStorage.instance = new FavesLocalStorage(key);
    }

    return FavesLocalStorage.instance;
  }

  // save news to local storage
  public saveNews(news: HitsModel): void {
    this._savedNews.push(news);
    this.saveAll();
  }

  // check if news is already saved in local storage by comparing story_id and story_title
  // and return true if it is already saved
  public hasNews(news: HitsModel): boolean {
    return this._savedNews.some(
      (n) => n.story_id === news.story_id && n.story_title === news.story_title,
    );
  }

  // remove news from local storage by comparing story_id and story_title
  public removeNews(news: HitsModel): void {
    const indexNews = this._savedNews.findIndex(
      (n) => n.story_id === news.story_id && n.story_title === news.story_title,
    );
    if (indexNews !== -1) {
      this._savedNews.splice(indexNews, 1);
      this.saveAll();
    }
  }

  // save all news to local storage
  private saveAll(): void {
    localStorage.setItem(this.key, JSON.stringify(this._savedNews));
  }

  private getAllFromLocalStorage(): HitsModel[] {
    if (typeof window !== "undefined") {
      const savedNews = localStorage.getItem(this.key);
      if (savedNews) {
        return JSON.parse(savedNews);
      }
    }
    return [];
  }
}
