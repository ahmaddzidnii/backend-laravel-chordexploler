import { axiosAuthenticatedInstance } from "@/lib/axiosAuthenticatedInstance";

export type Section = {
  code: number;
  data: {
    id: string;
    song_id: string;
    name: string;
    start_time: number;
    end_time: number;
    position: number;
    content: string;
  }[];
};

export const createSection = async (section: {
  name: string;
  start_time: number;
  end_time: number;
  content: string;
  song_id: string;
}) => {
  const { data } = await axiosAuthenticatedInstance.post("/studio/sections", section);
  return data;
};

export const getSections = async (songId: string) => {
  const { data } = await axiosAuthenticatedInstance.get<Section>(`/studio/sections`, {
    params: {
      song_id: songId,
    },
  });
  return data;
};

export const reorderSections = async (sections: Section["data"]) => {
  const { data } = await axiosAuthenticatedInstance.post("/studio/sections/reorder", {
    sections: [
      ...sections.map((section) => ({
        id: section.id,
        position: section.position,
      })),
    ],
  });
  return data;
};

export const deleteSections = async (ids: string[]) => {
  const { data } = await axiosAuthenticatedInstance.delete("/studio/sections", {
    data: {
      ids,
    },
  });
  return data;
};
