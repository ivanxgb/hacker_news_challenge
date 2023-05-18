import { HackerNewsAPIResponse } from "@/service/models/HitsModel";

export class HackerNewsApi {
  private baseUrl = "https://hn.algolia.com/api/v1";
  private endpoint = "/search_by_date";
  private query = "?query=";
  private page = "&page=";

  async getHackerNews(
    queryTerm: string,
    page: number = 0,
  ): Promise<HackerNewsAPIResponse | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}${this.endpoint}${this.query}${queryTerm}${this.page}${page}`,
      );
      const data = await response.json();
      return data.hits;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
