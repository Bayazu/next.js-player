import axios from "axios";
import { ITrack } from "../types/track";

export const tracksAPI = {
  async fetchTracksData() {
    return await axios.get<ITrack[]>(process.env.NEXT_PUBLIC_DOMAIN + "tracks");
  },
  async searchTracks(query: string) {
    return await axios.get<ITrack[]>(
      process.env.NEXT_PUBLIC_DOMAIN + `tracks/search?query=${query}`
    );
  },
  async createTrack(data: FormData) {
    return await axios.post<ITrack>(
      process.env.NEXT_PUBLIC_DOMAIN + `tracks`,
      data
    );
  },
  async getTrackById(id: string) {
    return await axios.get<ITrack>(
      process.env.NEXT_PUBLIC_DOMAIN + `tracks/${id}`
    );
  },
};
