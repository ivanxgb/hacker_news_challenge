export interface HackerNewsAPIResponse {
  hits: HitsModel[];
}

export interface HitsModel {
  created_at: string | null;
  author: string | null;
  story_id: number | null;
  story_title: string;
  story_url: string | null;
}
