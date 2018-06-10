import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router'
import App from 'features/App/components/App';
import { Provider } from 'react-redux';
import configureStore from 'configureStore.prod';
import manifest from '../build/asset-manifest.json';
import { Helmet } from 'react-helmet'
import serialize from 'serialize-javascript';
import sagas from 'rootSagas';

import { getLoadableState } from 'loadable-components/server';

const path = require("path");
const fs = require("fs");

const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

module.exports = async (req,res) => {
	const filePath = path.resolve(__dirname,  '..', 'build/', 'index.html');
	fs.readFile(filePath, 'utf8', async (err, htmlData) => {
		const modules = [];
		const location = req.url;
		const store = configureStore();
		const context = {};
		const appWithRouter = (
			<Loadable.Capture report={m => modules.push(m)}>
				<StaticRouter location={location} context={context}>
					<Provider store={store}>
						<App />
					</Provider>
				</StaticRouter>
			</Loadable.Capture>
		)

		let loadableState = {};
		loadableState = await getLoadableState(appWithRouter);
		store.runSaga(sagas).done.then(async ()=>{
				const html = ReactDOMServer.renderToString(
						<Loadable.Capture report={m => modules.push(m)}>
								<StaticRouter location={location} context={context}>
										<Provider store={store}>
												<App/>
										</Provider>
								</StaticRouter>
						</Loadable.Capture>
				)
				const helmet = Helmet.renderStatic();
				const extraChunks = extractAssets(manifest, modules).map(c => `<script type="text/babel" src="./${c}" ></script>`);
				const state = store.getState();
				return await res.send(
					htmlData
						.replace(`<html lang="en" itemscope>`,`<html ${helmet.htmlAttributes.toString()} itemscope>`)
						.replace('<div id="root"></div>', 
							`
								<div id="root">${html}</div>
								<script>window.__PRELOADED_STATE__=${serialize(state)}</script>
								${loadableState.getScriptTag()}
							`
					)
				.replace('</body>', extraChunks.join('') + '</body>')
				.replace('<meta helmet>', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)
			);
		});
		store.close()
	})
}