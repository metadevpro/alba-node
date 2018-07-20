export interface Repository<T> {
    get(criteria: any): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(obj: T): Promise<T>;
    update(id: string, obj: T): Promise<T>;
    delete(id: string): Promise<T>;
}
