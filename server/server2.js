import express from 'express';
import Loadable from 'react-loadable';
import render from './render2';

const path = require("path");
const compression = require("compression");


const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) return false;
  return compression.filter(req, res);
}

app.use(compression({level: 2}));

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