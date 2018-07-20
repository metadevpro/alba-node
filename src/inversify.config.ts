import { Container } from "inversify";
import { Logger } from "./infrastructure/logger";
import { TYPES } from "./types";
import { ConsoleLogger } from "./infrastructure/console-logger";
import { NoLogger } from "./infrastructure/no-logger";

export function configureIoC(options: any = {}): Container {
    const iocContainer = new Container();

    if (options.log === false) {
        iocContainer.bind<Logger>(TYPES.Logger).to(NoLogger);
    } else {
        iocContainer.bind<Logger>(TYPES.Logger).to(ConsoleLogger);
    }
    return iocContainer;
}
