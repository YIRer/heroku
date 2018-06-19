import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';

import { Provider } from 'react-redux';
import configureStore from 'configureStore.prod';
import manifest from '../build/asset-manifest.json';
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable';

import sagas from 'rootSagas';
import App from 'features/App/components/App';
import render from './template';

const path = require("path");
const fs = require("fs");

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


module.exports = async (req,res) => {
  const filePath = path.resolve(__dirname,  '..', 'build/', 'index.html');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  fs.readFile(filePath, 'utf8', async (err, htmlData) => {
      const modules = [];
      const store = configureStore();
      const context = {};

      const appWithRouter = (
        <Loadable.Capture report={m => modules.push(m)}>
          <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                  <App />
              </StaticRouter>
          </Provider>
        </Loadable.Capture>
      );

      if (context.url) {
          res.redirect(context.url);
          return;
      }
      if(err){
        res.redirect("/404");
          return;
      }

      let loadableState = {};

      // .done is resolved when store.close() send an END event
      store.runSaga(sagas).done.then(async () => {
          const helmet = Helmet.renderStatic();
          const extraChunks = extractAssets(manifest, modules).map(c => `<script type="text/babel" src="./${c}" ></script>`);
          const html = ReactDOMServer.renderToString(appWithRouter);
          const preloadedState = store.getState();
          return await res.status(200).send(render(htmlData,html, helmet, extraChunks, preloadedState, loadableState));
      });

      // Trigger sagas for component to run
      // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
      loadableState = await getLoadableState(appWithRouter);

      // Dispatch a close event so sagas stop listening after they're resolved
      store.close();
    })
}