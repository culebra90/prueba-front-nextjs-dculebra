import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailPodcast } from "../../utils/types";
import ErrorPage from 'next/error';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { HeaderTitle } from '../../components/HeaderTitle';

import { LateralPanel } from '../../components/podcast/LateralPanel'
import { DetailPodcastHtml } from '../../components/podcast/DetailPodcast'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DetailsPodcast() {
  const router = useRouter();
  const { podcast } = router.query;
  const [postData, setPostData] = useState<DetailPodcast[] | []>([]);
  const podcastId = podcast?.[0];
  const episodeId = podcast?.[2];  

  useEffect(() => {
    const fetchData = async (podcastId : string) => {
      const res = await fetch(`/api/podcasts/${podcastId}`);
      const postData = await res.json();        
      setPostData(postData);           
    };  
    if (podcastId) fetchData(podcastId);
  }, [podcastId]);
  
  if(podcast?.[1]!== 'episode' && podcast?.[1]!== undefined){
    return (<ErrorPage statusCode={404} />)
  }

  if(podcast === undefined && podcastId === undefined) return (<></>)

  return (
    <>      
      <React.Fragment>
        <Container maxWidth="lg">
          <HeaderTitle />
          <hr/>
          <Box sx={{ flexGrow: 1 }} className="mt-5">
            <Grid container spacing={12}>
              <LateralPanel {...{ postData }} />
              {
                episodeId !== undefined && podcastId !== undefined
                  ? <h1 className='mt-50 pt-50'>detalles del episodio</h1>
                  : <DetailPodcastHtml postData={postData} podcastId={podcastId} />
              }                           
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}