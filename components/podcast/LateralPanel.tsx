import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { DetailPodcast } from '../../utils/types'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface DetailPodcastProps {
    getData: DetailPodcast[];
}

export const LateralPanel: React.FC<DetailPodcastProps> = ({ getData }) => {
    return (<Grid item xs={6} md={4}>
                <Item>
                {
                    getData.length > 0 
                    ? <Image src={getData[0]?.image} width={500} height={500}  alt="Picture of the author"/> 
                    : <>Cargando..</> 
                }
                <Divider variant="middle" />
                {
                    getData.length > 0  
                    ? <p>{getData[0]?.title}<br/>by {getData[0]?.author}</p> 
                    : <>Cargando..</> 
                }
                <Divider variant="middle" />
                {
                    getData.length > 0  
                    ? <div>Description:<br/><div dangerouslySetInnerHTML={{ __html: getData[0]?.description }} /></div> 
                    : <>Cargando..</> 
                }
                </Item>
            </Grid>);
}