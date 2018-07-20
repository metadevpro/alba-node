import { Repository } from "./Repository";

export class InMemoryRepository<T> implements Repository<T> {
    private data: { [key: string]: T };
    private idField: keyof T;
    private sequencer = 0;

    constructor(idField: keyof T) {
        this.data = {};
        this.idField = idField;
    }

    private createUniqueKey(): string {
        // Asumes key as string
        const key = 'e' + (this.sequencer++).toString();
        return key;
    }

    async get(criteria: any): Promise<T[]> {
        // ignore criteria
        return Object.keys(this.data).map(k => this.data[k]);
    }
    async getById(id: string): Promise<T> {
        const candidate: T = this.data[id];
        return candidate;
    }
    async create(obj: T): Promise<T> {
        if  (!obj) {
            throw new Error('Missing object for creation');
        }
        const key = obj[<string>this.idField];
        if (key) {
            const duplicate: T = this.data[key];
            if (duplicate) {
                throw new Error('Duplicate key on insertion');
            }
        }
        // generate new key
        obj[<string>this.idField] = this.createUniqueKey();
        this.data[key] = obj;
        return obj;
    }
    async update(id: string, obj: T): Promise<T> {
        if  (!obj) {
            throw new Error('Missing object for update');
        }
        this.data[id] = obj;
        return obj;
    }
    async delete(id: string): Promise<T> {
        const candidate = this.data[id];
        if (candidate) {
            delete this.data[id];
        }
        return candidate;
    }
}
