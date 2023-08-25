import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { parseString } from 'xml2js';
import { DetailPodcast, propertiesEpisodes } from '../../../utils/types'

const isLink = (str: any) => {
  const linkPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
  return linkPattern.test(str);
}

export const DetailsPodcast = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {    
    const { query: { podcastId } } = req;
    console.log(`Peticion al servidor... PodcastId: "${podcastId}"`);
    const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}`);
    const { results } = await response.json();
    const urlDecode = results[0].feedUrl;
    const response2 = await fetch(urlDecode);
    const xmlData = await response2.text();
    let parsedData: any;
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error('Error al analizar el XML:', err);
        res.status(500).json({ error: 'Error al analizar el XML' });
      } else {
        parsedData = result;
      }
    });
    const channel = parsedData.rss.channel[0];
    let contentLink: boolean;
    for (let i = 0; i < channel.item.length; i++) {
      let val = channel.item[i];
      let episodeId = (val.guid)
        ? val.guid[0]['_']
        : (val.guid[0].indexOf('tag:soundcloud') === -1) ? val.guid[0]['_'].split('/')[1] : '-';
      if (isLink(episodeId)) {
        contentLink = true;
        break;
      }
    }
    const resPodcastDetail : DetailPodcast = {
      id: podcastId,
      title: channel.title[0],
      author: channel['itunes:author'][0],
      description: channel.description[0],
      image: results[0].artworkUrl600,
      episodes: channel.item.map((val: any, i: number): propertiesEpisodes => {
        let episodeId = (val.guid)
          ? val.guid[0]['_']
          : (val.guid[0].indexOf('tag:soundcloud') === -1) ? val.guid[0]['_'].split('/')[1] : '-';
        return {
          title: val.title,
          date: dayjs(val.pubDate).format("D/M/YYYY"),
          description: val.description,
          duration: val['itunes:duration'],
          id: (contentLink) ? `num-${i}` : episodeId,
          media: (val.enclosure) ? {
            length: val.enclosure?.[0]["$"]["length"],
            type: val.enclosure?.[0]["$"]["type"],
            url: val.enclosure?.[0]["$"]["url"]
          } : false
        };
      })
    };
    res.status(200).json(resPodcastDetail);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

export default DetailsPodcast;