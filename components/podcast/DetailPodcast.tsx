import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import { propertiesEpisodes } from '../../utils/types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Item } from '../../styles/functionStyle';
import styles from '../../styles/Podcast.module.css';

interface DetailPodcastHtmlProps {
    episodes: propertiesEpisodes[];
}

export const DetailPodcastHtml: React.FC<DetailPodcastHtmlProps> = ({ episodes }) => {
    console.log("episodes = > ", episodes)
    const router = useRouter();
    const { podcast } = router.query;
    const podcastId = podcast?.[1];

    const linkEpisode = (episodeId:string) => {        
        const reducedItem : any = episodes.find(item => item.id === episodeId);
        localStorage.setItem('globalObject', JSON.stringify(reducedItem));
        router.push(`/podcast/${podcastId}/episode/${episodeId}`);
    }

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
                        {episodes?.map((row : propertiesEpisodes,i:number) => (
                        <TableRow key={row.title} className={(i%2===0) ? styles['filaPar'] : styles['filaImpar']}>
                            <TableCell className={`${styles['celda']} ${styles['primeraCelda']}`} key={`title_${row.title}`} component="th" scope="row" onClick={() => linkEpisode(row.id)}>
                                {row.title}
                            </TableCell>
                            <TableCell className={styles['celda']} key={`title_${row.date}`} align="left">{row.date}</TableCell>
                            <TableCell className={`${styles['celda']} ${styles['ultimaCelda']}`} key={`title_${row.duration}`} align="right">{row.duration}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Item>
            </Grid>)
};