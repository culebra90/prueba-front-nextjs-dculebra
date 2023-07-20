import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Podcast } from '../utils/types';
import { HeaderTitleLoading } from './HeaderTitle';
import { SearchBlock, CardPodcast, WithoutResults, LoadingPodcasts } from './home/modulesHome'

export const Home: React.FC = () => {
    const [getData, setgetData] = useState<Podcast[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Podcast[]>([]);
    const [swSearch, setSwSearch] = useState(false);

    useEffect(() => {
        const getListPodcast = async () => {
            const res = await fetch('/api/listPodcast');
            const getData = await res.json();
            setgetData(getData);
        };
        getListPodcast();
    }, []); 

    useEffect(() => {        
        const filteredResults = getData.filter(
            (post) => post.name.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);               
    }, [searchTerm, getData]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        (value != '') ? setSwSearch(true) : setSwSearch(false);    
        setSearchTerm(value);
    }; 

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <HeaderTitleLoading loading={searchResults.length>0 ? false : true} />
                <hr/>
                <SearchBlock {...{ searchTerm, handleSearch, searchResults }} />
                <Box className="flexGrow-1 mt-20">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 4 }} className="pt-15">
                    {(searchResults.length > 0) ? searchResults.map((podcast, i) => (<CardPodcast {...{ podcast, i }} />))
                        : (swSearch) ? <WithoutResults /> : <></>}
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}