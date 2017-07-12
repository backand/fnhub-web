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
import * as _ from 'lodash';

// module
import { AppServerModule } from './app/app.server.module';

enableProdMode();
const server = express();
server.use(compression());

var router = express.Router();
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


server.use('/api', router);

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


router.route('/module/:module_name').get(function (req: any, res: any) {
  backand.fn.get("getModule", {
    "name": req.params.module_name
  }).then((response: any) => {
    let m = _.get(response, 'data.data[0]');
    let repoURL: string = _.get(m, 'githubRepo') as string;
    if (repoURL) {
      let readmeUri = _.replace(repoURL, /github.com/gi, 'raw.githubusercontent.com') + '/master/README.md';
      backand.fn.get("mdToHtml", {
        "mdFileUri": readmeUri //"https://github.com/ivogabe/gulp-typescript/blob/master/readme.md"
      }).then((rs: any) => {
        response.data['module_details'] = rs.data;
        res.json(response);
      });
    } else {
      response['module_details'] = 'No description found';
      res.json(response);
    }
  });
});



server.use('/', express.static('public', { index: false }));
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


function readMDfile(mdFileUri: string): void {
  return backand.fn.get("mdToHtml", {
    "mdFileUri": mdFileUri //"https://github.com/ivogabe/gulp-typescript/blob/master/readme.md"
  })
}