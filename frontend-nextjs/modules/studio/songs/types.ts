import { ApiResponseWithoutPaginationType } from "@/types";

export type SogInfoResponseType = ApiResponseWithoutPaginationType<{
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
  sections: any[];
  keys: {
    id: string;
    key: string;
    family_name: string;
    family: string;
  }[];
  created_at: string;
  updated_at: string;
}>;
