export interface IComment{
    _id: string;
    username: string;
    text: string;
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio : string;
    comments : IComment[]
}

export enum Status {
    LOADING = "loading",
    SUCCESS = " success",
    ERROR = "error",
}

export interface TracksState {
    tracks : ITrack[],
    status : Status
}


