import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack, Status, TracksState } from "../../types/track";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";
import { AppThunk, RootState } from "../store";
import { tracksAPI } from "../../api/tracksAPI";

const initialState: TracksState = {
  tracks: [],
  status: Status.LOADING,
};

export const tracksSlice = createSlice({
  name: "tracksSlice",
  initialState,
  reducers: {
    setEnt(state, action) {
      return action.payload;
    },
    createTrackLoading: ({ status }) => {
      status = Status.LOADING;
    },
    createTrackLoad: (state, action: PayloadAction<ITrack[]>) => {
      state.status = Status.SUCCESS;
      state.tracks = action.payload;
    },
    createTrackError: ({ status }) => {
      status = Status.ERROR;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.tracks,
      };
    },
  },
});

export const fetchTracks = (): AppThunk => async (dispatch) => {
  dispatch(
    tracksSlice.actions.setEnt({
      tracks: [],
      status: Status.LOADING,
    })
  );
  try {
    const { data } = await tracksAPI.fetchTracksData();
    dispatch(
      tracksSlice.actions.setEnt({
        tracks: data,
        status: Status.SUCCESS,
      })
    );
  } catch (e) {
    dispatch(
      tracksSlice.actions.setEnt({
        tracks: [],
        status: Status.ERROR,
      })
    );
  }
};

export const searchTracks =
  (query: string): AppThunk =>
  async (dispatch) => {
    dispatch(createTrackLoading());
    try {
      const { data } = await tracksAPI.searchTracks(query);
      dispatch(createTrackLoad(data));
    } catch (e) {
      dispatch(createTrackError());
    }
  };

export const { createTrackLoading, createTrackError, createTrackLoad } =
  tracksSlice.actions;

export const selectTracksData = () => (state: RootState) => state.tracks;

export default tracksSlice.reducer;
