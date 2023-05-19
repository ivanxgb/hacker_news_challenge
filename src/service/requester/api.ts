import { HackerNewsAPIResponse } from "@/service/models/HitsModel";

const baseUrl = "https://hn.algolia.com/api/v1";
const endpoint = "/search_by_date";
const query = "?query=";
const queryPage = "&page=";

export async function getHackerNews(
  queryTerm: string,
  page: number = 0,
): Promise<HackerNewsAPIResponse | null> {
  try {
    const url = `${baseUrl}${endpoint}${query}${queryTerm}${queryPage}${page}`; // format url

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    // cast response to HackerNewsAPIResponse
    return (await response.json()) as HackerNewsAPIResponse;
  } catch (error) {
    return null;
  }
}
