import { APIURL } from 'constants/settings';

const getData = (resource = 'users') => {
  return fetch(`${APIURL}${resource}`)
    .then(response => response.json());
};

export default getData;
