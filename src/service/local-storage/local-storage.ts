import { HitsModel } from "@/service/models/HitsModel";

// Class to manage local storage interactions
export class LocalStorage {
  private static instance: LocalStorage;

  private constructor(private readonly key: string) {}

  // get instance of LocalStorage using singleton pattern
  public static getInstance(key: string): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage(key);
    }
    return LocalStorage.instance;
  }

  // get all items from local storage or empty array if there is no items
  public getAll(): HitsModel[] {
    const saved = localStorage.getItem(this.key);
    if (saved) {
      return JSON.parse(saved) as HitsModel[];
    }

    return [];
  }

  // save news to local storage
  public saveNews(news: HitsModel): void {
    const items = this.getAll();
    items.push(news);
    this.saveAll(items);
  }

  // check if news is already saved in local storage by comparing story_id and story_title
  // and return true if it is already saved
  public hasNews(news: HitsModel): boolean {
    const allNews = this.getAll();
    return allNews.some(
      (n) => n.story_id === news.story_id && n.story_title === news.story_title,
    );
  }

  // remove news from local storage by comparing story_id and story_title
  public removeNews(news: HitsModel): void {
    const allNews = this.getAll();
    const indexNews = allNews.findIndex(
      (n) => n.story_id === news.story_id && n.story_title === news.story_title,
    );
    if (indexNews !== -1) {
      allNews.splice(indexNews, 1);
      this.saveAll(allNews);
    }
  }

  // save all news to local storage
  private saveAll(news: HitsModel[]): void {
    localStorage.setItem(this.key, JSON.stringify(news));
  }
}
