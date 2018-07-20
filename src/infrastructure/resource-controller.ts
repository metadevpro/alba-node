import { Router } from "express";
import { Container } from "inversify";
import { Logger } from "./logger";
import { TYPES } from "../types";
import { InMemoryRepository } from "./in-memory-repository";
import { Repository } from "./repository";

export class ResourceController<PK, T> {
    private logger;
    private repository: Repository<T>;

    constructor(
        public prefix: string,
        public resource: string,
        public pluralName: string,
        private router: Router,
        private iocContainer: Container
    ) {
        this.logger = this.iocContainer.get<Logger>(TYPES.Logger);
        this.repository = new InMemoryRepository<T>(<keyof T>'id');
        this.setupController();
    }

    setupController() {
        const route = '/' + this.pluralName.toLowerCase();
        const repo = this.repository;

        this.router.get(route, async (req, res) => {
            try {
                const criteria = null;
                const response = await repo.get(criteria);
                res.send(response);
            }
            catch (error) {
                console.error(error.message);
                res.status(500).json(error);
            }
        });
        this.router.get(route + '/:id', async (req, res) => {
            try {
                const response = await repo.getById(req.params.id);
                if (!response) {
                    res.status(404).end();
                    return;
                }
                res.send(response);
            }
            catch (error) {
                console.error(error.message);
                res.status(500).json(error);
            }
        });
        this.router.post(route, async (req, res) => {
            const payload = <T> req.body;
            const response = await repo.create(payload);
            res.send(response);
        });
        this.router.put(route + '/:id', async (req, res) => {
            const payload = <T> req.body;
            const response = await repo.update(req.params.id, payload);
            res.send(response);
        });
        this.router.delete(route + '/:id', async (req, res) => {
            const response = await repo.delete(req.params.id);
            res.send(response);
        });

        this.logger.info('Registered: GET, POST        on ' + this.prefix + route);
        this.logger.info('Registered: GET, PUT, DELETE on ' + this.prefix + route + '/:id');
    }
}
