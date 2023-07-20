import React, { useEffect, useState } from 'react';
import { DetailPodcast } from "../utils/types";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { HeaderTitleLoading } from './HeaderTitle';

import { LateralPanel } from './podcast/LateralPanel';
import { DetailPodcastHtml } from './podcast/DetailPodcast';

export const PodcastHtml: React.FC = () => {
    const router = useRouter();
    const { podcast } = router.query;
    const [getData, setgetData] = useState<DetailPodcast[] | []>([]);
    const podcastId = podcast?.[1];
    const episodeId = podcast?.[3];  

    useEffect(() => {
        const fetchData = async (podcastId : string) => {
        const res = await fetch(`/api/podcasts/${podcastId}`);
        const getData = await res.json();        
        setgetData(getData);           
        };  
        if (podcastId) fetchData(podcastId);
    }, [podcastId]);

    return (      
        <React.Fragment>
            <Container maxWidth="lg">
            <HeaderTitleLoading loading={getData.length ? false : true} />
            <hr/>
            <Box sx={{ flexGrow: 1 }} className="mt-5">
                <Grid container spacing={12}>
                <LateralPanel {...{ getData }} />
                {
                    episodeId !== undefined && podcastId !== undefined
                    ? <h1 className='mt-50 pt-50'>detalles del episodio</h1>
                    : podcast === undefined 
                        ? <></> 
                        : <DetailPodcastHtml episodes={getData[0]?.episodes} podcastId={podcastId} />
                }                           
                </Grid>
            </Box>
            </Container>
        </React.Fragment>
    );
}