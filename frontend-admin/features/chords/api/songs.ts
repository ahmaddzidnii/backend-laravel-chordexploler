import { axiosAuthenticatedInstance } from "@/lib/axiosAuthenticatedInstance";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  per_page: number;
  count: number;
  total: number;
}

export interface Daum {
  id: string;
  user_id: string;
  title: string;
  artist: string[];
  slug: string;
  cover: string;
  youtube_url: string;
  released_year: number;
  publisher: string;
  key: string[];
  bpm: number;
}

type Songs = {
  code: number;
  pagination: Pagination;
  data: Daum[];
};

export const getSongs = async (page: number, limit = 10) => {
  const response = await axiosAuthenticatedInstance.get<Songs>(`/studio/songs`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
