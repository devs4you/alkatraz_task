/* eslint-disable no-tabs */
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Logger = require('koa-logger');
const serve = require('koa-static');
const mount = require('koa-mount');
const cors = require('koa-cors');
const HttpStatus = require('http-status');

const app = new Koa();

// These are the new change
const staticPages = new Koa();
// eslint-disable-next-line no-path-concat
staticPages.use(serve(__dirname + '/build')); // serve the build directory
app.use(mount('/', staticPages));

const PORT = process.env.PORT || 3000;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

router.get('/posts', async (ctx, next) => {
	const posts = [];
	ctx.status = HttpStatus.OK;
	ctx.body = posts;
	await next();
});

router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	ctx.status = HttpStatus.OK;
	ctx.body = 'success';
	fs.readFile('database.json', 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		} else {
			obj = JSON.parse(data); // now it an object
			obj.table.push({ id: 2, square: 3 }); // add some data
			json = JSON.stringify(obj); // convert it back to json
			fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
		}
	});
	await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
	console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
