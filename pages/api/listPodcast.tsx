import { NextApiRequest, NextApiResponse } from 'next';
import { Podcast } from '../../utils/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    const { feed } = await response.json();
    const { entry } = feed;

    const postcads = entry.map((enty: any) : Podcast => {
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
    res.status(200).json(postcads);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}