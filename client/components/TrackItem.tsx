import React, {FC} from 'react';
import {ITrack} from "../types/track";
import {Card, Grid} from "@mui/material";
import styles from "../styles/TrackItem.module.scss"
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";

import {playTrack, setActiveTrack} from "../store/slices/playerSlice";
import {useAppDispatch} from "../store/store";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: FC<TrackItemProps> = ({track, active = true}) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const play = (e) => {
        e.stopPropagation()
        dispatch(setActiveTrack(track))
        dispatch(playTrack())
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <img width={70} height={70} src={"http://localhost:5000/" + track.picture} alt={'#'}/>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: "grey"}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={(e) => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;