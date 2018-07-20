import { Logger } from "./logger";
import { injectable } from "inversify";

@injectable()
export class ConsoleLogger implements Logger {
    log(... params: any[]): void {
        if (params && params.length === 1) {
            console.log(params[0]);
        } else {
            console.log(params);
        }
    }
    info(... params: any[]): void {
        if (params && params.length === 1) {
            console.info(params[0]);
        } else {
            console.info(params);
        }
    }
    warn(... params: any[]): void {
        if (params && params.length === 1) {
            console.info(params[0]);
        } else {
            console.info(params);
        }
    }
    error(... params: any[]): void {
        if (params && params.length === 1) {
            console.info(params[0]);
        } else {
            console.info(params);
        }
    }
}
