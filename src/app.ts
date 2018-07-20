import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";

import { configureIoC } from "./inversify.config";
import { Logger } from "./infrastructure/logger";
import { TYPES } from "./types";
import { ResourceController } from "./infrastructure/resource-controller";
import { Artist } from "./domain/artist";
import { Album } from "./domain/album";
import { Song } from "./domain/song";
import { Pong } from "./cal/pong";
import { DiagnosisResponse } from "./cal/diagnosis-response";

export class App {
    server: express.Application;

    start(options: any) {
        const app = express();
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: '50mb'
        }));
        app.use(bodyParser.json({
            limit: '50mb'
        }));

        const iocContainer = configureIoC(options);

        const logger = iocContainer.get<Logger>(TYPES.Logger);
        const  router = express.Router();

        router.get('/ping', (req, res) => {
            res.status(200)
               .send(Pong.response());
        });
        router.get('/metrics', (req, res) => {
            res.status(200)
               .contentType('plain/text')
               .send('# Metrics');
        });
        router.get('/autodiagnosis', (req, res) => {
            const fakeDiagnosis: DiagnosisResponse = {
                name: 'alba',
                version: '1.0.0',
                timestamp: '20180629T13:43:00+02:00',
                checks: [
                    { name: 'db', desc: 'Database is accesible', result: true },
                    { name: 'smtp', desc: 'SMTP server is failing.', result: false },
                ]
            };
            res.status(200)
               .send(fakeDiagnosis);
        });

        const routePrefix = '/api';
        const c1 = new ResourceController<string, Artist>(routePrefix, 'artist', 'artists', router, iocContainer);
        const c2 = new ResourceController<string, Album>(routePrefix, 'album', 'albums', router, iocContainer);
        const c3 = new ResourceController<string, Song>(routePrefix, 'song', 'songs', router, iocContainer);
        app.use(routePrefix, router);

        const port = +process.env.PORT || 5000;
        app.listen(port);
        logger.log('App running on port: ' + port);

        this.server = app;
    }
    stop() {
        process.exit(0);
    }
}
