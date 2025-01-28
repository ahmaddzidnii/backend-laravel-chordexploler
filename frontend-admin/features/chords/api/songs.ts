import { axiosAuthenticatedInstance } from "@/lib/axiosAuthenticatedInstance";

export const getSongs = async (page: number) => {
  const response = await axiosAuthenticatedInstance.get(`/studio/songs`, {
    params: {
      page: page,
      limit: 10,
    },
  });
  return response.data;
};
