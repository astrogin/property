import axios from 'axios';

const Http = axios.create({
  contentType: 'application/json; charset=UTF-8',
});

export default Http;
