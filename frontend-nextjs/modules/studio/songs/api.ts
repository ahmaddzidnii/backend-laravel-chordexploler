import { axiosAuthenticatedInstance } from "@/lib/axiosAuthenticatedInstance";
import { SogInfoResponseType } from "./types";

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

export interface Key {
  id: string;
  key: string;
  family_name: string;
  family: string;
}

export interface Daum {
  id: string;
  user_id: string;
  title: string;
  artist: string[];
  slug: string;
  status: string;
  genres: {
    id: string;
    name: string;
  }[];
  cover: string;
  youtube_url: string;
  released_year: number;
  publisher: string;
  bpm: number;
  keys: Key[];
  created_at: string;
  updated_at: string;
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

export const createSong = async (data: FormData) => {
  // Using axios to send the data
  const response = await axiosAuthenticatedInstance.post<{
    data: {
      id: string;
      user_id: string;
      title: string;
      artist: string[];
      slug: string;
      status: string;
      cover: string;
      youtube_url: string;
      released_year: number;
      publisher: string;
      bpm: number;
      created_at: string;
      updated_at: string;
    };
  }>("/studio/songs", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const removeSong = async (ids: string[]) => {
  const response = await axiosAuthenticatedInstance.delete(`/studio/songs`, {
    data: {
      ids,
    },
  });
  return response.data;
};

export const getKeyOptions = async () => {
  const response = await axiosAuthenticatedInstance.get<{
    code: number;
    data: {
      id: string;
      key: string;
      family: string[];
    }[];
  }>("/public/get-key-options");
  return response.data;
};

export const getSongById = async (id: string) => {
  const response = await axiosAuthenticatedInstance.get<SogInfoResponseType>(
    `/studio/songs/${id}`,
    {}
  );
  return response.data;
};

export const getGenreOptions = async () => {
  const response = await axiosAuthenticatedInstance.get<{
    code: number;
    data: {
      id: string;
      name: string;
    }[];
  }>(`/public/get-genre-options`);
  return response.data;
};
