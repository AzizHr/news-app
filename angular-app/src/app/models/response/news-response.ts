import {CategoryForNewsResponse} from "./category-for-news-response";

export interface NewsResponse {
  id: number;
  title: string;
  content: string;
  started_at: string;
  expired_at: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  category?: CategoryForNewsResponse
}
