"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../api/app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Main');
    const port = process.env.PORT;
    await app.listen(port, () => logger.log(`Server running in ${process.env.APP_URL}:${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map