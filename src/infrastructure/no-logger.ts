import { Logger } from "./logger";
import { injectable } from "inversify";

@injectable()
export class NoLogger implements Logger {
    log(... params: any[]): void {}     // nop
    info(... params: any[]): void {}    // nop

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
