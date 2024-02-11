import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40949300-f150d44bfc1d9390d5c29918c';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
};
