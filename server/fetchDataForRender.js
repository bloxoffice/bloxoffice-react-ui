import url from 'url';
import { matchPath } from 'react-router-dom';

import Preview from '../src/containers/Preview';

const routesThatFetchData = [
  // {
  //   path: '/',
  //   component: Home,
  //   exact: true
  // },
];

const fetchDataForRender = (req, store) => {
  const promises = [];

  routesThatFetchData.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    if (match) {
      const promise = (route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match));
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
};

export default fetchDataForRender;
