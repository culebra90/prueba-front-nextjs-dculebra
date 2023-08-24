import { NextApiRequest, NextApiResponse } from 'next';
import { Podcast } from '../../utils/types';
import cacheData from "memory-cache";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const keyList = 'listPodcast';
    let postcads = cacheData.get(keyList);    
    if(!postcads){
      console.log(`Peticion al servidor... (Lista de Podcasts)`);
      const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const { feed } = await response.json();
      const { entry } = feed;
      postcads = entry.map((enty: any) : Podcast => {
        return {
          image: {
            url: enty['im:image'][2].label,
            height: enty['im:image'][2].attributes.height
          },
          name: enty['im:name'].label,
          author: enty['im:artist'].label,
          id: enty['id'].attributes['im:id']       
        };
      });
      cacheData.put(keyList, postcads, 24 * 1000 * 60 * 60);
    }    
    res.status(200).json(postcads);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}