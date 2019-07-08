import { API_URL } from 'core/constants';

const getData = (resource = 'users') => fetch(`${API_URL}${resource}`)
  .then(response => response.json());

export default getData;
