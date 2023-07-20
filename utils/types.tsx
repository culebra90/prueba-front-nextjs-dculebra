interface propertiesImage {
    url: string;
    height: number;
}

export interface Podcast { 
    image: propertiesImage   
    name: string;
    author: string;
    id: number;
}

export interface propertiesEpisodes {
    title: string;
    date: string;
    description: string;
    duration: string;
    id: string;
}

export interface DetailPodcast { 
    title: string  
    author: string;
    description: string;
    episodes: propertiesEpisodes[];
    image: string;
}