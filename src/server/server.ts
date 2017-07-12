// polyfills
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

// angular
import { enableProdMode } from '@angular/core';

// libs
import * as express from 'express';
import * as compression from 'compression';
import { ngExpressEngine } from '@ngx-universal/express-engine';
import * as backand from '@backand/nodejs-sdk'

// module
import { AppServerModule } from './app/app.server.module';

enableProdMode();
const server = express();
server.use(compression());

/**
 * Set view engine
 */
server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

/**
 * Enable backand
 */

backand.init({
  appName: 'funhub',
  anonymousToken: 'f10673bb-d12a-4245-8eca-312add606059',
})

server.set('view engine', 'html');
server.set('views', 'public');

/**
 * Point static path to `public`
 */
server.use('/', express.static('public', {index: false}));

/**
 * Catch all routes and return the `index.html`
 */
server.get('/module/:slug', (req, res) => {
      backand.fn.get("getModule", {
      "name": 'twilio-node-template'
    }).then((res: any) => {
      res.render('../public/index.html', {
        req,
        res
      });
    });
});

server.get('*', (req, res) => {
  res.render('../public/index.html', {
    req,
    res
  });
});

/**
 * Port & host settings
 */
const port = 8000;
const PORT = process.env.PORT || port;
const HOST = process.env.BASE_URL || 'localhost';
const baseUrl = `http://${HOST}:${PORT}`;

server.set('port', PORT);

/**
 * Begin listening
 */
server.listen(server.get('port'), () => {
  // tslint:disable-next-line
  console.log(`Express server listening on ${baseUrl}`);
});
