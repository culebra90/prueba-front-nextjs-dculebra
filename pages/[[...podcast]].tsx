import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Home } from '../components/Home';
import { HeaderTitleLoading } from '@/components/HeaderTitle';
import { PodcastHtml } from '@/components/PodcastHtml';

export const Main = () => {
    const router = useRouter();
    const { podcast } = router.query; 

    if(router.asPath.indexOf("/[[...podcast]]")!==-1) 
        return (<><HeaderTitleLoading loading={true} /><hr/></>);
    
    if(podcast?.[2]!== 'episode' && podcast?.[2]!== undefined || (podcast && podcast.length>4)) 
        return (<ErrorPage statusCode={404} />)
  
    if(!podcast) 
        return (<Home/>);

    return (<PodcastHtml/>);
};

export default Main;