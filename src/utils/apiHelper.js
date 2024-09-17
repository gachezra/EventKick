import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
};

export const apiHelper = (method, url, data = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return axios({
    method,
    url,
    headers,
    data,
  });
};
