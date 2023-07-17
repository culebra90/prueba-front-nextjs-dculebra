import { useEffect, useState } from 'react';
import { Post } from './api/posts';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

export const Home = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [swSearch, setSwSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/posts');
      const postData = await res.json();
      setPostData(postData);
    }; 

    fetchData();
  }, []); 

  useEffect(() => {
    const filteredResults = postData.filter(
      (post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);

  }, [searchTerm, postData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    (value != '') ? setSwSearch(true) : setSwSearch(false);    
    setSearchTerm(value);
  };   
  
  return (
    <>
      <React.Fragment>
        <Container maxWidth="lg">
          <Typography gutterBottom variant="h5" component="div" sx={{color: '#009fff', letterSpacing: -1, lineHeight: 1.1, fontWeight: 600}}>
            Podcaster
          </Typography>
          <hr/>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={1} sx={{m:2, pr: 5}}>
            <Grid item>              
              <Typography gutterBottom variant="h6" sx={{color: 'white', fontWeight: 600,backgroundColor: '#009fff', borderRadius: '8px', lineHeight: 1.3, pl: 0.75, pr: 0.75}}>
                {searchResults.length}
              </Typography>
            </Grid>
            <Grid item>
              <TextField size="small" id="outlined-basic" label="Filter podcasts..." variant="outlined" value={searchTerm} onChange={handleSearch} />
            </Grid>
          </Grid>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 4 }}>
              {
                (searchResults.length > 0) 
                  ? searchResults.map((post,i) => (             
                    <Grid item xs={2} sm={4} md={4} lg={1} key={i} sx={{position: "relative", mt: 7}}> 
                     
                      <Link href={`/podcast/${post.id}`} passHref className='my-link'>
                        <Avatar alt="{img-{post.name}" src={post.image.url} sx={{ width: 100, height: 100, position: 'absolute', top: -25, left: 100}} />
                        <Card sx={{ maxWidth: 250, minHeight: 100, pt: 5, mb:0 }} key={i}>
                          <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h6" component="div" sx={{textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.1, fontSize: 18}}>
                              {post.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontWeight: 600, letterSpacing: -0.5}}>
                            Author: {post.author}
                            </Typography>
                          </CardContent>
                        </Card>   
                      </Link>                 
                    </Grid>                                  
                  ))
                  : (swSearch) 
                    ? <Box sx={{m:5}}>
                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 600, letterSpacing: -0.5}}>
                          Sin resultados.
                        </Typography>                      
                      </Box> 
                    : <Box sx={{ display: 'flex', m: 5}}>
                      <CircularProgress />
                    </Box>
              }
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
  
};

export default Home;