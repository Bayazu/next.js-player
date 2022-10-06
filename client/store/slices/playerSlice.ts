import { PlayerState } from "../../types/player";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track";
import { HYDRATE } from "next-redux-wrapper";

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 25,
  pause: true,
};

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    playTrack(state) {
      state.pause = false;
    },
    pauseTrack(state) {
      state.pause = true;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setActiveTrack(state, action: PayloadAction<ITrack>) {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.player,
      };
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  setCurrentTime,
  setVolume,
  setDuration,
  setActiveTrack,
} = playerSlice.actions;
export default playerSlice.reducer;

