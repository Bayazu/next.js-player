import React, { ChangeEvent, FC, useCallback, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Card, Grid, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Status } from "../../types/track";
import TrackList from "../../components/TrackList";
import { useAppDispatch, wrapper } from "../../store/store";
import { useSelector } from "react-redux";
import {
  fetchTracks,
  searchTracks,
  selectTracksData,
} from "../../store/slices/trackSlice";
import { GetServerSideProps } from "next";
import debounce from "lodash.debounce";

const Index: FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tracks, status } = useSelector(selectTracksData());
  const [query, setQuery] = useState<string>("");

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(searchTracks(str));
    }, 250),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    updateSearchValue(event.target.value);
  };

  if (status === Status.ERROR) {
    return (
      <MainLayout>
        <h1> Произошла ошибка при загрузке данных</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Список треков - музыкальная платформа"}>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={onChangeInput} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(fetchTracks());
    return {
      props: {},
    };
  });

export default Index;
