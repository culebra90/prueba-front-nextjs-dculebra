import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailPodcast } from "../../utils/types";
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { HeaderTitle } from '../../components/HeaderTitle';
import Divider from '@mui/material/Divider';
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

export default function DetailsPodcast() {
  const router = useRouter();
  const { podcastId } = router.query;

  const [postData, setPostData] = useState<DetailPodcast[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      if(podcastId){
        const res = await fetch(`/api/podcasts/${podcastId}`);
        const postData = await res.json();        
        setPostData(postData);
      }      
    };
    fetchData();
  }, []);   

  return (
    <>
      <React.Fragment>
        <Container maxWidth="lg">
          <HeaderTitle />
          <hr/>
          <Box sx={{ flexGrow: 1 }} className="mt-5">
            <Grid container spacing={12}>
              <Grid item xs={6} md={4}>
                <Item>
                  {
                    postData 
                      ? <Image src={postData[0]?.image} width={500} height={500}  alt="Picture of the author"/> 
                      : <>Cargando..</> 
                  }
                  <Divider variant="middle" />
                  {
                    postData 
                      ? <p>{postData[0]?.title}<br/>by {postData[0]?.author}</p> 
                      : <>Cargando..</> 
                  }
                  <Divider variant="middle" />
                  {
                    postData 
                      ? <div>Description:<br/><div dangerouslySetInnerHTML={{ __html: postData[0]?.description }} /></div> 
                      : <>Cargando..</> 
                  }
                </Item>
              </Grid>
              <Grid item xs={6} md={8}>
                <Item className='mb-5'>
                  {
                    postData 
                      ? <>Episodes: {postData[0]?.episodes.length}</> 
                      : <>Episodes</> 
                  }
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
                        {postData ? postData[0]?.episodes.map((row) => (
                          <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={`title_${row.title}`} component="th" scope="row">{row.title}</TableCell>
                            <TableCell key={`title_${row.date}`} align="right">{row.date}</TableCell>
                            <TableCell key={`title_${row.duration}`} align="right">{row.duration}</TableCell>
                          </TableRow>
                        )) : <></>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              </Grid>                            
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
}

/*import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { podcastId } = router.query;

  return (
    <div>
      <h1>Podcast ID: {podcastId}</h1>
    </div>
  );
};

export default Post;*/