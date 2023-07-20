import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { propertiesEpisodes } from '../../utils/types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface DetailPodcastHtmlProps {
    episodes: propertiesEpisodes[];
    podcastId: string | undefined;
}

export const DetailPodcastHtml: React.FC<DetailPodcastHtmlProps> = ({ episodes, podcastId }) => {
    console.log("episodes = > ", episodes)
    return (<Grid item xs={6} md={8} className="mt-0 pt-0">
                <Item className='mb-5'>
                 Episodes: {episodes?.length}
                </Item>
                <Item className='p-3'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {episodes?.map((row : propertiesEpisodes) => (
                        <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={`title_${row.title}`} component="th" scope="row">
                            <Link href={`/podcast/${podcastId}/episode/${row.id}`} passHref>{row.title}</Link>
                            </TableCell>
                            <TableCell key={`title_${row.date}`} align="right">{row.date}</TableCell>
                            <TableCell key={`title_${row.duration}`} align="right">{row.duration}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Item>
            </Grid>)
};