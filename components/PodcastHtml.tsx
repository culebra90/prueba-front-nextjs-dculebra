import React, { useEffect, useState } from 'react';
import { DetailPodcast } from "../utils/types";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { HeaderTitleLoading } from './HeaderTitle';

import { LateralPanel } from './podcast/LateralPanel';
import { DetailPodcastHtml } from './podcast/DetailPodcast';
import { EpisodePodcast } from './podcast/EpisodePodcast';

export const PodcastHtml: React.FC = () => {
    const router = useRouter();
    const { podcast } = router.query;
    const [getData, setGetData] = useState<DetailPodcast[] | []>([]);
    const podcastId = podcast?.[1];
    const episodeId = podcast?.[3]; 
    
    console.log("podcastId => ", podcastId)    

    useEffect(() => {
        const keyLocalStorage = `detailPodcast-${podcastId}`;
        const getDetailPodcast = async () => {
            const res = await fetch(`/api/podcasts/${podcastId}`);
            const getData = await res.json();                    
            setGetData(getData);           
        };
        if(podcastId){
            getDetailPodcast();
        }
    }, [podcastId]);

    return (      
        <React.Fragment>
            <Container maxWidth="lg">
            <HeaderTitleLoading loading={getData.length ? false : true} />           
            <Box sx={{ flexGrow: 1 }} className="mt-5">
                <Grid container spacing={12}>
                <LateralPanel {...{ getData }} />
                {
                    episodeId !== undefined 
                    ? <EpisodePodcast />
                    : <DetailPodcastHtml episodes={getData[0]?.episodes} />
                }                           
                </Grid>
            </Box>
            </Container>
        </React.Fragment>
    );
}