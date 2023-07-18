import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import styles from '../../styles/Home.module.css';
import { Podcast } from '../../pages/api/listPodcast';

interface CardPodcastProps {
    podcast: Podcast;
    i: number;
  }

export const CardPodcast: React.FC<CardPodcastProps> = ({ podcast, i }) => {
    return (<Grid item xs={2} sm={4} md={4} lg={1} key={i} className={styles['block-card']}>
                <Link href={`/podcast/${podcast.id}`} passHref className={styles['link-podcast']}>
                <Avatar alt="{img-{podcast.name}" src={podcast.image.url} className={styles['avatar-home']} />
                <Card className={styles['block-int-card']} key={i}>
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