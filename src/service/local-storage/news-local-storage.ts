export class NewsLocalStorage {
  private static instance: NewsLocalStorage;

  private constructor(private readonly key: string) {}

  public static getInstance(key: string): NewsLocalStorage {
    if (!NewsLocalStorage.instance || NewsLocalStorage.instance.key !== key) {
      NewsLocalStorage.instance = new NewsLocalStorage(key);
    }

    return NewsLocalStorage.instance;
  }

  public getFilterSelected(): string {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.key) || "";
    }

    return "";
  }

  public saveFilterSelected(filterSelected: string): void {
    localStorage.setItem(this.key, filterSelected);
  }
}
