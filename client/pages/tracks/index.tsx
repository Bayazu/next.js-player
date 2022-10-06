import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, Box, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {ITrack, Status} from "../../types/track";
import TrackList from "../../components/TrackList";
import {useAppDispatch, useAppSelector, wrapper} from "../../store/store";
import {useSelector, useStore} from "react-redux";
import {fetchTracks, searchTracks, selectTracksData} from "../../store/slices/trackSlice";
import {GetServerSideProps} from "next";


const Index = (props) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {tracks, status} = useSelector(selectTracksData())
    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState(null)


    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        //TODO переписать на норм штуку
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(searchTracks(e.target.value))
            }, 500)
        )
    }

    if (status === Status.ERROR) {
        return <MainLayout>
            <h1> Произошла ошибка при загрузке данных</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={'Список треков - музыкальная платформа'}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField fullWidth value={query} onChange={search}/>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({params}) => {
    await store.dispatch(fetchTracks());
    // console.log('State on server', store.getState());

    return {
        props: {},
    };
});


export default Index;