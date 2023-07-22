import Grid from '@mui/material/Grid';
import { Item } from '../../styles/functionStyle';
import { propertiesEpisodes } from '../../utils/types';
import Typography from '@mui/material/Typography';
import styles from '../../styles/Podcast.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const EpisodePodcast: React.FC = () => {
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];
    const episode : propertiesEpisodes = JSON.parse(localStorage.getItem('globalObject') ?? '');
    return (<Grid item xs={6} md={8} className="mt-0 pt-0">
                <Item>
                    <Link href={`/podcast/${podcastId}`} passHref className={styles['link-title-episode']}>
                        <Typography variant="h5" component="div" className={styles['title-episode']}>
                            {episode.title}
                        </Typography>                    
                    </Link>
                    <div className={`${styles['title-episode']} ${styles['description-episode']}`} dangerouslySetInnerHTML={{ __html: episode.description }} /> 
                    {episode.media ? <audio controls className={styles['player-audio']}>
                        <source src={episode.media.url} type={episode.media.type} /> 
                        Tu navegador no soporta el elemento de audio.
                    </audio> : <></>}
                </Item>
            </Grid>
            );
};