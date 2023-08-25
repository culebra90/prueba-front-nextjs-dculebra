import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Podcast } from '../utils/types';
import { HeaderTitleLoading } from './HeaderTitle';
import { SearchBlock, CardPodcast, WithoutResults, LoadingPodcasts } from './home/modulesHome';
import { useSelector, useDispatch } from 'react-redux';
import { addList } from '../redux/podcastListSlice';
import { addPodcast } from '../redux/detailPodcastSlice';
import { setCache, getCache } from '../utils/cacheLocalStorage';


export const Home: React.FC = () => {

    let listPodcasts: Podcast[];
    listPodcasts = useSelector((state: { list: Podcast[] }) => state.list);
    const dispatch = useDispatch();
    const keyList = 'listPodcast';

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Podcast[]>([]);
    const [swSearch, setSwSearch] = useState(false);

    useEffect(() => {
        dispatch(addPodcast({}));
        const listPodcastsCache = getCache(keyList);
        if (listPodcastsCache) {
            listPodcasts = listPodcastsCache;
            if (listPodcasts.length == 0) {
                dispatch(addList(listPodcastsCache));
            }
        } else if (listPodcasts.length == 0) {
            console.log("fetching... server /HOME/");
            fetch('/api/listPodcast')
                .then((response) => response.json())
                .then((data) => {
                    dispatch(addList(data));
                    setCache(keyList, data);
                    dispatch(addPodcast({}));
                })
                .catch((error) => console.log(error));
        }
    }, [listPodcasts]);

    useEffect(() => {
        const filteredResults = listPodcasts.filter(
            (post) => post.name.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [searchTerm, listPodcasts]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        (value != '') ? setSwSearch(true) : setSwSearch(false);
        setSearchTerm(value);
    };

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <HeaderTitleLoading loading={searchResults.length > 0 ? false : (swSearch) ? false : true} />
                <hr />
                <SearchBlock {...{ searchTerm, handleSearch, numberSearch: searchResults?.length }} />
                <Box className="flexGrow-1 mt-20">
                    {<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 4 }} className="pt-15">
                        {(searchResults.length > 0) ? searchResults.map((podcast, i) => (<CardPodcast key={i} {...{ podcast }} />))
                            : (swSearch) ? <WithoutResults /> : <LoadingPodcasts />}
                    </Grid>}
                </Box>
            </Container>
        </React.Fragment>
    );
}