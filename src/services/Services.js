import axios from 'axios';
import dayjs from 'dayjs';

export function randomParam() {
  const param = '';
  const val = Math.floor(Math.random() * 50);
  if (val > 25) {
    return `country=us&category=business`;
  } else {
    return `q=trump`;
  }
}
export function getNews() {
  return axios
    .get(
      `http://newsapi.org/v2/top-headlines?` +
        randomParam() +
        `&apiKey=8cd6da0e3fb34828b35f2d0073dd65dd`,
    )
    .then((response) => {
      console.log(' raw response : ', response);
      const {status, articles} = response.data;

      if (status) {
        return articles;
      } else {
        return status;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function formatMessageDate(dateString) {
  let dateTemplate = 'DD/MMM/YYYY';
  const msgDate = dayjs(dateString);
  dateTemplate = 'DD MMM YYYY';

  return msgDate.format(dateTemplate);
}
