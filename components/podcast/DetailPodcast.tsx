import styles from './Podcast.module.css';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import { propertiesEpisodes, DetailPodcast } from '../../utils/types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Item } from '../../styles/functionStyle';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export const DetailPodcastHtml = () => {
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];
    const detailPodcast = useSelector((state: { detail: DetailPodcast }) => state.detail);
    const episodes: propertiesEpisodes[] = detailPodcast?.episodes;

    return (<Grid item xs={6} md={8} className="mt-0 pt-0">
        <Item className={styles['cant-episodes']}>
            Episodes: {episodes?.length}
        </Item>
        <Item className='p-3'>
            <TableContainer component={Paper} className={styles['tableDetail']}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${styles['primeraCelda']} ${styles['strong-cell']}`}>Title</TableCell>
                            <TableCell className={`${styles['celda']} ${styles['strong-cell']}`} align="left">Date</TableCell>
                            <TableCell className={`${styles['ultimaCelda']} ${styles['strong-cell']}`} align="right">Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {episodes?.map((row: propertiesEpisodes, i: number) => (
                            <TableRow key={`title_${i}-3`} className={(i % 2 === 0) ? styles['filaPar'] : styles['filaImpar']}>
                                <TableCell className={`${styles['celda']} ${styles['link']} ${styles['primeraCelda']}`} key={`title_${i}`} component="th" scope="row">
                                    <Link href={`/podcast/${podcastId}/episode/${row.id}`} passHref className={styles['link-title-episode']}>
                                        {row.title}
                                    </Link>
                                </TableCell>
                                <TableCell className={styles['celda']} key={`title_${i}-2`} align="left">{row.date}</TableCell>
                                <TableCell className={`${styles['celda']} ${styles['ultimaCelda']}`} key={`title_${i}-4`} align="right">{row.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Item>
    </Grid>)
};