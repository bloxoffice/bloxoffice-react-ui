import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('GA INIT');
  ReactGA.initialize('UA-114127321-1');
};
export const logPageView = (path) => {
  ReactGA.set({ page: path });
  console.log(path);
  ReactGA.pageview(path);
};
