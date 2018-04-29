import path from 'path';
import express from 'express';
import shrinkRay from 'shrink-ray';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import morgan from 'morgan';
import fetch from 'isomorphic-fetch';

import config from '../config/webpack.config.dev';
import renderServerSideApp from './renderServerSideApp';
import urls from '../src/constants/urls';

const app = express();

app.use(function (req, res, next) {
  next();
});

app.use(shrinkRay());
app.use(helmet());

app.use(express.static(path.join(__dirname, '../build')));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    progress: true,
    stats: {
      colors: true,
      assets: true,
      modules: false,
      chunks: false
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 4000
  }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

app.use("/about", express.static(path.join(__dirname, "../static_pages/about")));

app.get('/', renderServerSideApp);
// app.get('/register', renderServerSideApp);
// app.get('/register/npo/:tokenId', renderServerSideApp);
// app.get('/campaigns/new', renderServerSideApp);
// app.get('/campaign/:campaignId', renderServerSideApp);
// app.get('/preview/:campaignId', renderServerSideApp);
// app.get('/campaigns', renderServerSideApp);
// app.get('/verify/email/:userId', renderServerSideApp);
// app.get('/forgotPassword', renderServerSideApp);
// app.get('/resetPassword/:userId', renderServerSideApp);
// app.get('/donate/:campaignName/:campaignId', renderServerSideApp);
// app.get('/payment', renderServerSideApp);
// app.get('/npo/setup', renderServerSideApp);
// app.get('/npo/preview', renderServerSideApp);
// app.get('/npo/dashboard', renderServerSideApp);
//
// app.get('/:userSlugName/campaign/:campaignSlugName', (req, res) => {
//   if (req.params.campaignSlugName !== 'undefined') {
//     return fetch(`${process.env.apiBaseUrl}${urls.getCampaign}/${req.params.userSlugName}/${req.params.campaignSlugName}`, {
//       method: 'GET'
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         let campaignData = response.body.campaigns[0] || {};
//         campaignData.donationRaised = 0;
//         if (campaignData.donors) {
//           campaignData.donors.forEach((donor) => {
//             campaignData.donationRaised += donor.donationAmount;
//           });
//         }
//
//         return renderServerSideApp(req, res, {
//           campaignData
//         });
//       });
//   } else {
//     return res.json(null);
//   }
// });
//
// // app.get('/npo/slug/:publicPage', renderServerSideApp);
//
// app.get('/npoProfile/slug/:npoSlugName', (req, res) => {
//   if (req.params.npoSlugName !== 'undefined') {
//     return fetch(`${process.env.apiBaseUrl}/npoProfile/slug/${req.params.npoSlugName}`, {
//       method: 'GET'
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         const npo = response.body.npoProfile;
//         console.log('npoProfile', npo);
//         return renderServerSideApp(req, res, {
//           npo
//         });
//       });
//   } else {
//     return res.json(null);
//   }
// });

export default app;
