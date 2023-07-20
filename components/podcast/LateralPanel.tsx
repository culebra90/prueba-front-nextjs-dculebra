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
    postData: DetailPodcast[];
}

export const LateralPanel: React.FC<DetailPodcastProps> = ({ postData }) => {
    console.log("LateralPanel postData => ", postData)
    return (<Grid item xs={6} md={4}>
                <Item>
                {
                    postData.length > 0 
                    ? <Image src={postData[0]?.image} width={500} height={500}  alt="Picture of the author"/> 
                    : <>Cargando..</> 
                }
                <Divider variant="middle" />
                {
                    postData.length > 0  
                    ? <p>{postData[0]?.title}<br/>by {postData[0]?.author}</p> 
                    : <>Cargando..</> 
                }
                <Divider variant="middle" />
                {
                    postData.length > 0  
                    ? <div>Description:<br/><div dangerouslySetInnerHTML={{ __html: postData[0]?.description }} /></div> 
                    : <>Cargando..</> 
                }
                </Item>
            </Grid>);
}