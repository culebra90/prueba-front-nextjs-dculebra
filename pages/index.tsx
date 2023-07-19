import React from 'react'
import { Podcast } from '../utils/types';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { HeaderTitle } from '../components/HeaderTitle';
import { SearchBlock } from '../components/home/SearchBlock';
import { CardPodcast, WithoutResults, LoadingPodcasts } from '../components/home/ResultsPodcasts';

export const Home = () => {
  const [postData, setPostData] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Podcast[]>([]);
  const [swSearch, setSwSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/listPodcast');
      const postData = await res.json();
      setPostData(postData);
    };
    fetchData();
  }, []); 

  useEffect(() => {
    const filteredResults = postData.filter(
      (post) => post.name.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(filteredResults);
  }, [searchTerm, postData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    (value != '') ? setSwSearch(true) : setSwSearch(false);    
    setSearchTerm(value);
  };   
  
  return (
    <>
      <React.Fragment>
        <Container maxWidth="lg">
          <HeaderTitle />
          <hr/>
          <SearchBlock {...{ searchTerm, handleSearch, searchResults }} />
          <Box className="flexGrow-1 mt-20">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 4 }} className="pt-15">
              {(searchResults.length > 0) ? searchResults.map((podcast, i) => (<CardPodcast {...{ podcast, i }} />))
                : (swSearch) ? <WithoutResults /> : <LoadingPodcasts />}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
  
};

export default Home;