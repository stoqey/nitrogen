import bodyParser from 'body-parser';
import { execSync } from 'child_process';
import express from 'express';
import fs from 'fs';
import next from 'next';
import path from 'path';

import Assets from '../client/assets';
import { apolloServerSetUp } from './apollo';

export const assets = Assets;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {

    // Config
    const server = express();
    server.use(bodyParser.json());

    // isEmpty(process.env && process.env.STORAGE_PATH)? process.env.STORAGE_PATH : __dirname + '/../public' )

    // make path
    const publicDir = path.resolve(process.env && process.env.STORAGE_PATH ? process.env.STORAGE_PATH : __dirname + '/../public');

    // 2. Add Public Storage to app
    server.use('/assets', express.static(path.resolve(__dirname + '/../client/assets')))
    server.use(express.static(publicDir))


    // 3. Create public dir if not exits
    if (!fs.existsSync(publicDir)) {
      execSync(`mkdir ${publicDir}`)
    }


    // 4. Add transId image resolver
    server.get('/results/:transId', function (req, res) {
      const transId = req.params && req.params.transId;

      const filename = path.join(__dirname, `../public/${transId}`);

      console.log('transId ==================-----------> ' + transId, filename);

      res.set('Cache-Control', 'public, max-age=10000, s-maxage=10000');

      if (fs.existsSync(filename)) {
        return res.sendFile(filename);
      }

      res.sendFile(path.join(__dirname, '../public/output.png'));

    });



    // 5. Add apollo server, WS and default next handler
    apolloServerSetUp(server, handle);

  })
  .catch((ex: { stack: any; }) => {
    console.error(ex.stack);
    process.exit(1);
  });