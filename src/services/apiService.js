import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
async function getPictures(query, page) {
  const {
    data: { hits },
  } = await axios.get(
    `&q=${query}&page=${page}&per_page=12&key=22969482-37b7f2c7deb329174334b9da4`,
  );
  return hits;
}

export default getPictures;
