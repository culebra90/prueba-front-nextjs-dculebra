import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { DetailPodcast } from '../../utils/types';
import { Item } from '../../styles/functionStyle';
import styles from '../../styles/Podcast.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ImageLateralProps {
    link: boolean;
    podcastId: string | undefined;
    urlImage: string;
}
interface DetailPodcastProps {
    getData: DetailPodcast[];
}

interface TitleAndAuthorProps {
    author: string;
    title: string;
    podcastId: string | undefined;
    link: boolean;
}

const ImageLateral : React.FC<ImageLateralProps> = ({link, podcastId, urlImage}) => {    
    if(link){
        return (<Link href={`/podcast/${podcastId}`} passHref className={styles['imagen-link-podcast']}>
                    <Image src={urlImage} width={500} height={500}  alt={`Picture of ${podcastId}`}/>                        
                </Link>);
    }
    return <Image src={urlImage} width={500} height={500}  alt={`image-${podcastId}`}/>;
}

const TitleAndAuthor : React.FC<TitleAndAuthorProps> = ({link, title, author, podcastId}) => {
    if(link){
        return (<p className={styles['author-lateral']}>
                    <span>{title}</span>
                    <Link href={`/podcast/${podcastId}`} passHref className={styles['link-author']}>
                        <label>by {author}</label>
                    </Link>
                </p>);
    }
    return (<p className={styles['author-lateral']}>
                <span>{title}</span>
                <label>by {author}</label>
            </p>);
}

export const LateralPanel: React.FC<DetailPodcastProps> = ({ getData }) => {
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];
    const episodeId = podcast?.[3];
    console.log("GETDATA LateralPanel => ", getData)
    return (<Grid item xs={6} md={4}>
                <Item className={styles['item-lateral']}>
                    {getData.length > 0 
                        ? <ImageLateral link={(episodeId) ? true : false} podcastId={podcastId} urlImage={getData[0]?.image}/>
                        : <>Cargando..</> }
                <Divider variant="middle" />
                    {getData.length > 0  
                        ? <TitleAndAuthor link={(episodeId) ? true : false} podcastId={podcastId} author={getData[0]?.author} title={getData[0]?.title}/>
                        : <>Cargando..</> }
                <Divider variant="middle" />
                    {getData.length > 0  
                        ? <>
                            <div className={styles['lateral-description']}>
                                <span>Description:</span>
                                <div className={styles['description-content']} dangerouslySetInnerHTML={{ __html: getData[0]?.description }} />
                            </div>
                        </> 
                        : <>Cargando..</>}
                </Item>
            </Grid>);
}