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
import { useSelector, useDispatch } from 'react-redux';
import { addPodcast } from '../redux/detailPodcastSlice';

export const PodcastHtml: React.FC = () => {
    const detailPodcast = useSelector((state: { detail: DetailPodcast }) => state.detail);
    const router = useRouter();
    const { podcast } = router.query;
    const dispatch = useDispatch(); 
    const podcastId = podcast?.[1];
    const episodeId = podcast?.[3];  
    
    useEffect(() => {
        fetch(`/api/podcasts/${podcastId}`)
            .then((response) => response.json())
            .then((data) => dispatch(addPodcast(data)))
            .catch((error) => console.log(error));       
    }, [podcastId]);

    
    return (
        <React.Fragment>
            <Container maxWidth="lg">
            <HeaderTitleLoading loading={detailPodcast?.id ? false : true} />
            <hr/>
            <Box sx={{ flexGrow: 1 }} className="mt-5">
                <Grid container spacing={12}>                
                <LateralPanel {...{ detailPodcast }} />                
                {
                    episodeId !== undefined 
                    ? <EpisodePodcast />
                    : <DetailPodcastHtml/>
                }                           
                </Grid>
            </Box>
            </Container>
        </React.Fragment>
    );
}