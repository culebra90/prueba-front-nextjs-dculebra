import styles from './Header.module.css'
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LoadingPodcasts } from '@/components/home/modulesHome';
import Box from '@mui/material/Box';
import Link from 'next/link';
 
export const HeaderTitleLoading = ({ loading }: { loading: boolean }) => {
  if(loading){
    return (
      <React.Fragment>
        <Container maxWidth="lg">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} className={styles['header-title']}>
              <Box gridColumn="span 8">              
                <Typography variant="h5" component="div" className={styles['link-header']}>
                  <Link href={'/'} passHref>
                      Podcaster
                  </Link>
                </Typography>              
              </Box>
              <Box gridColumn="span 4">
                <LoadingPodcasts />
              </Box>          
            </Box>
        </Container>
    </React.Fragment>
    );    
  }
  return (
    <React.Fragment>
        <Container maxWidth="lg">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 8" className={styles['header-title']}>
              <Typography variant="h5" component="div" className={styles['link-header']}>
                <Link href={'/'} passHref>
                    Podcaster
                </Link>
              </Typography>
            </Box>                      
          </Box>
        </Container>
    </React.Fragment>
  );  
}