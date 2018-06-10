/* eslint-disable no-console */
"use strict";
import express from 'express';
import Loadable from 'react-loadable';
import serverStatic from 'serve-static';
import render from './render';

const nocache = require('nocache')
const path = require("path");
const fs = require("fs");

const extractAssets = (assets, chunks) => Object.keys(assets)
	.filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
	.map(k => assets[k]);
    
const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(nocache())

app.get('*.*', express.static(path.join(__dirname)));

router.get('/', render);

router.use(express.static(
	path.resolve(__dirname, '..', 'build')
));
router.get('*', render);

app.use(router);
Loadable.preloadAll().then(() => {
	app.listen(PORT, (error) => {
		if (error) {
			return console.log('something bad happened', error);
		}
		console.log("listening on " + PORT + "...");
	});
});