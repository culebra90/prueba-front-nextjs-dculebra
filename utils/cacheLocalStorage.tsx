import dayjs from 'dayjs';
import 'dayjs/locale/es';

export const setCache = (key: string, data: any) => {
  if (data?.episodes.length > 100) {
    const chunkSize = 100;
    for (let i = 0; i < data.episodes.length; i += chunkSize) {
      const chunk = data.episodes.slice(i, i + chunkSize);
      localStorage.setItem(`${key}-blk-ep-${i}`, JSON.stringify(chunk));
    }
    const { episodes, ...dataAxe } = data;
    const payloadAxe = {
      expiration: dayjs().add(5, 'minute'),
      data: dataAxe,
    };
    localStorage.setItem(key, JSON.stringify(payloadAxe));
  } else {
    const payload = {
      expiration: dayjs().add(24, 'hour'),
      data,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  }
};

export const getCache = (key: string) => {
  const getData = localStorage.getItem(key);

  if (!getData) {
    return false;
  }

  const { expiration, data } = JSON.parse(getData);

  if (dayjs(expiration) < dayjs()) {
    localStorage.removeItem(key);
    return false;
  }

  if (key.indexOf('podcast-') !== -1) {
    let episodes: any[] = [];
    const prefix = `${key}-blk-ep-`;

    for (let i = 0; i < localStorage.length; i++) {
      const currentKey = localStorage.key(i);

      if (currentKey && currentKey.startsWith(prefix)) {
        const chunkString = localStorage.getItem(currentKey);
        if (chunkString) {
          const chunk = JSON.parse(chunkString);
          episodes = episodes.concat(chunk);
        }
      }
    }

    episodes.sort(compareDates);
    data.episodes = episodes;
    return data;
  }
  return data;
};

function compareDates(a: any, b: any) {
  const dateA = dayjs(a.date, 'D/M/YYYY');
  const dateB = dayjs(b.date, 'D/M/YYYY');
  return dateB.diff(dateA);
}