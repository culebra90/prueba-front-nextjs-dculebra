import styles from './Home.module.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { Podcast } from '../../utils/types';

interface CardPodcastProps {
    podcast: Podcast;
}

interface SearchBlockProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numberSearch: number;
}

export const SearchBlock: React.FC<SearchBlockProps> = ({ searchTerm, handleSearch, numberSearch }) => {

    return (<Grid container justifyContent="flex-end" alignItems="center" spacing={1} className="m-2 pr-5">
                <Grid item>              
                    <Typography variant="h6" className={styles['number-list']}>
                    {numberSearch}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField size="small" id="outlined-basic" label="Filter podcasts..." variant="outlined" value={searchTerm} onChange={handleSearch} />
                </Grid>
            </Grid>);
}

export const CardPodcast: React.FC<CardPodcastProps> = ({ podcast }) => {
    return (<Grid item xs={2} sm={4} md={4} lg={1} key={podcast.id} className={styles['block-card']}>
                <Link href={`/podcast/${podcast?.id}`} passHref className={styles['link-podcast']}>
                <Avatar alt="{img-{podcast.name}" src={podcast.image.url} className={styles['avatar-home']} />
                <Card className={styles['block-int-card']} key={podcast.id}>
                    <CardContent className="text-center">
                    <Typography gutterBottom variant="h6" component="div" className={styles['title-song']}>
                        {podcast.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={styles['name-author']}>
                    Author: {podcast.author}
                    </Typography>
                    </CardContent>
                </Card>   
                </Link>                 
            </Grid> );
}

export const WithoutResults: React.FC = () => {
    return (<Box className="m-5">
                <Typography variant="body2" color="text.secondary" className={styles['name-author']}>
                Sin resultados.
                </Typography>                      
            </Box> );
}

export const LoadingPodcasts: React.FC = () => {
    return (<Box className="flex m-5">
                <CircularProgress />
            </Box> );
}