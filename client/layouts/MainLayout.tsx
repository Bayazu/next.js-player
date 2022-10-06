import React, {FC, ReactNode} from 'react';
import NavBar from "../components/Navbar";
import {Container} from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";


interface MainLayoutProps {
    children: ReactNode,
    title?: string,
    description?: string
    keywords?: string
}

const MainLayout: FC<MainLayoutProps> = ({children,title,description,keywords}) => {
    return (
        <>
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name="description" content={'Музыкальная площадка' + description}/>
                <meta name='robots' content="index, follow"/>
                <meta name='keywords' content={keywords || 'Музыка, треки, артисты'}/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
            </Head>
            <NavBar/>
            <Container style={{margin: '90px 0', maxWidth: '1920px'}}>
                {children}
            </Container>
            <Player/>


        </>
    );
};

export default MainLayout;