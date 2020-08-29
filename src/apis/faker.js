import axios from 'axios';

export default axios.create({
  baseURL: 'https://fakerapi.it/api/v1/'
})