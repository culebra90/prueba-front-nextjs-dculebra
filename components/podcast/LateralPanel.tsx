import styles from './Podcast.module.css';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { DetailPodcast } from '../../utils/types';
import { Item } from '../../styles/functionStyle';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ImageLateralProps {
    link: boolean;
    podcastId: string | undefined;
    urlImage: string;
}
interface DetailPodcastProps {
    detailPodcast: DetailPodcast;
}

interface TitleAndAuthorProps {
    author: string;
    title: string;
    podcastId: string | undefined;
    link: boolean;
}

const ImageLateral: React.FC<ImageLateralProps> = ({ link, podcastId, urlImage }) => {
    if (link) {
        return (<Link href={`/podcast/${podcastId}`} passHref className={styles['imagen-link-podcast']}>
            <>{urlImage ? <Image src={urlImage} width={500} height={500} alt={`image-${podcastId}`} /> : null}</>
        </Link>);
    }
    return (
        <>{urlImage ? <Image src={urlImage} width={500} height={500} alt={`image-${podcastId}`} /> : null}</>
    );

}

const TitleAndAuthor: React.FC<TitleAndAuthorProps> = ({ link, title, author, podcastId }) => {
    if (link) {
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

export const LateralPanel: React.FC<DetailPodcastProps> = ({ detailPodcast }) => {
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];
    const episodeId = podcast?.[3];
    return (<Grid item xs={6} md={4}>
        <Item className={styles['item-lateral']}>
            {detailPodcast
                ? <ImageLateral link={(episodeId) ? true : false} podcastId={podcastId} urlImage={detailPodcast?.image} />
                : <>Cargando..</>}
            <Divider variant="middle" />
            {detailPodcast
                ? <TitleAndAuthor link={(episodeId) ? true : false} podcastId={podcastId} author={detailPodcast?.author} title={detailPodcast?.title} />
                : <>Cargando..</>}
            <Divider variant="middle" />
            {detailPodcast
                ? <>
                    <div className={styles['lateral-description']}>
                        <span>Description:</span>
                        <div className={styles['description-content']} dangerouslySetInnerHTML={{ __html: detailPodcast?.description }} />
                    </div>
                </>
                : <>Cargando..</>}
        </Item>
    </Grid>);
}