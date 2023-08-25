import styles from './Podcast.module.css';
import Grid from '@mui/material/Grid';
import { Item } from '../../styles/functionStyle';
import { propertiesEpisodes, DetailPodcast } from '../../utils/types';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const EpisodePodcast: React.FC = () => {
    const detailPodcast = useSelector((state: { detail: DetailPodcast }) => state.detail);
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];
    let episodeId : any = podcast?.[3]; 

    let episode : propertiesEpisodes;

    if(episodeId?.indexOf('num-') !== -1){        
        episodeId = episodeId?.split('num-')[1];
        episode = detailPodcast?.episodes[episodeId];
    }else{
        episode = detailPodcast?.episodes.filter(episode => episode.id == episodeId)[0];
    }

    return (<>{(episode) ? <Grid item xs={6} md={8} className="mt-0 pt-0">
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
            </Grid> : <></>
            }</>);
};