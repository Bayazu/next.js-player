import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITrack, Status, TracksState} from "../../types/track";
import {HYDRATE} from 'next-redux-wrapper';
import axios from "axios";
import {AppThunk, RootState} from "../store";


const initialState: TracksState = {
    tracks: [],
    status: Status.LOADING
}

export const tracksSlice = createSlice({
    name: "tracksSlice",
    initialState,
    reducers: {
        setEnt(state, action) {
            return action.payload
        },
        createTrackLoading: ({status}) => {
            status = Status.LOADING;
        },
        createTrackLoad: ({status}) => {
            status = Status.SUCCESS;
        },
        createTrackError: ({status}) => {
            status = Status.ERROR;
        },

    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', action.payload);
            return {
                ...state,
                ...action.payload.tracks,
            };
        },
    },
});

export const fetchTracks = (): AppThunk => async dispatch => {
    dispatch(tracksSlice.actions.setEnt({
        tracks: [],
        status: Status.LOADING
    }))
    try {
        const {data} = await axios.get<ITrack[]>(`http://localhost:5000/tracks`);
        dispatch(tracksSlice.actions.setEnt({
            tracks: data,
            status: Status.SUCCESS
        }));
    } catch (e) {
        dispatch(tracksSlice.actions.setEnt({
            tracks: [],
            status: Status.ERROR
        }));
    }
};

export const searchTracks = (query : string): AppThunk => async dispatch => {
    dispatch(createTrackLoading())
    return await axios.get(`http://localhost:5000/tracks/search?query=${query}`).then(r=>{
        // dispatch(createTrackLoad())
        dispatch(tracksSlice.actions.setEnt({
            tracks: r.data,
            status: Status.SUCCESS
        }));
        return r.data
    }).catch(error=>{
        dispatch(createTrackError())
    });
};

export const createTrack = (formData): AppThunk => async dispatch => {
    dispatch(createTrackLoading())
    return await axios.post<ITrack[]>(`http://localhost:5000/tracks`, formData).then(r=>{
        dispatch(createTrackLoad())
        return r.data
    }).catch(error=>{
        dispatch(createTrackError())
    });
};

export const getTrackById = (id: string): AppThunk => async dispatch => {
    dispatch(createTrackLoading())
    return await axios.post<ITrack[]>(`http://localhost:5000/tracks` + id).then(r=>{
        dispatch(createTrackLoad())
        return r.data
    }).catch(error=>{
        dispatch(createTrackError())
    });
};


export const {
    createTrackLoading,
    createTrackError,
    createTrackLoad,
} = tracksSlice.actions;

export const selectTracksData = () => (state: RootState) => state.tracks;
export const selectStatusData = () => (state : RootState) => state.tracks.status

export default tracksSlice.reducer;

