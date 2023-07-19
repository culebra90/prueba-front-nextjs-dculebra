import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import { parseString } from 'xml2js';
import { DetailPodcast, propertiesEpisodes } from '../../../utils/types'

export const DetailsPodcast = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try{

    const { query: { podcastId }} = req;    
    
    const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}`);
    const { results } = await response.json();

    const urlDecode = results[0].feedUrl;  
    
    const response2 = await fetch(urlDecode);
    const xmlData = await response2.text();
    let parsedData : any;
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error('Error al analizar el XML:', err);
        res.status(500).json({ error: 'Error al analizar el XML' });
      } else {
        parsedData = result;
      }
    });   
    
    const channel = parsedData.rss.channel[0];

    const episodes = channel.item.map((val:any) : propertiesEpisodes => {
      return {
        title: val.title,
        date: moment(val.pubDate, "ddd, DD MMM YYYY HH:mm:ss Z").format("DD/MM/YYYY"),
        description: val.description,
        duration: val['itunes:duration']
      }
    })

    const payload : DetailPodcast = {
      title: channel.title[0],
      author: channel['itunes:author'][0],
      description: channel.description[0],
      image: results[0].artworkUrl600,
      episodes: episodes
    };

    res.status(200).json([payload]);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

export default DetailsPodcast;