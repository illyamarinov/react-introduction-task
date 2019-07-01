import { API_URL } from 'constants/settings';

const getData = (resource = 'users') => fetch(`${API_URL}${resource}`)
  .then(response => response.json());

export default getData;
