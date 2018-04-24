import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';


import asAsyncComponent from './utils/asAsyncComponent';

const AsyncNpoDashboard =  asAsyncComponent(() => import('./containers/Dashboard'));

const page = {
  index: {
    title: 'Bloxoffice',
    description: '',
    url: 'https://google.com',
    keywords: '',
    facebookShare: 'static/images/meta/facebook_share.png',
    twitterShare: 'static/images/meta/twitter_share.png',
    favicon: 'static/images/meta/favicon.png'
  },
  about: {
    title: 'About - New Project',
    description: 'This is a great new Project',
    url: 'https://google.com',
    keywords: 'test',
    facebookShare: 'static/images/meta/facebook_share.png',
    twitterShare: 'static/images/meta/twitter_share.png',
    favicon: 'static/images/meta/favicon.png'
  }
};

const App = () => (
  <div className="app">
    <div className="main">
      <title>Hlthe</title>

      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta content='width=device-width' name='viewport' />
      <meta content='yes' name='apple-mobile-web-app-capable' />
      <meta content='yes' name='apple-touch-fullscreen' />

      <link rel='icon' href={page.index.favicon} type='image/x-icon' />

      {/* Google content */}
      <meta content={page.index.title} name='application-name' />
      <meta content={page.index.description} name='description' />
      <meta content={page.index.title} name='author' />
      <meta content={page.index.keywords} name='keywords' />
      <meta content='2017' name='copyright' />


      {/*Facebook content*/}
      <meta content='website' property='og:type' />
      <meta content={page.index.title} property='og:title' />
      <meta content={page.index.description} property='og:description' />
      <meta content={page.index.facebookShare} property='og:image' />
      <meta content={page.index.url} property='og:url' />


      {/*Twitter content*/}
      <meta content='summary' name='twitter:card' />
      <meta content={page.index.title} name='twitter:title' />
      <meta content={page.index.description} name='twitter:description' />
      <meta content={page.index.twitterShare} name='twitter:image' />
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  </div>
);

export default App;
