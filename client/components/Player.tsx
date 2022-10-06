import React, { FC, useEffect } from "react";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import styles from "../styles/Player.module.scss";
import { Grid } from "@mui/material";
import TrackProgress from "./TrackProgress";

import {
  playTrack,
  pauseTrack,
  setVolume,
  setCurrentTime,
  setDuration,
} from "../store/slices/playerSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

let audio: HTMLAudioElement;

const Player: FC = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const { pause, volume, active, duration, currentTime } = useAppSelector(
    (state) => state.player
  );

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      initAudio();
      play();
    }
  }, [active]);

  const initAudio = (): void => {
    if (active) {
      audio.src = "http://localhost:5000/" + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)));
      };
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
      };
    }
  };

  const play = (): void => {
    if (pause && active) {
      dispatch(playTrack());
      audio?.play();
    } else {
      dispatch(pauseTrack());
      audio?.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolume(Number(e.target.value)));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={() => play()}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "grey" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
