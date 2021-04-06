"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestServer = void 0;
const express = require("express");
const cors = require("cors");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("../api/app.module");
exports.nestServer = express();
exports.nestServer.use(express.json());
exports.nestServer.use(express.urlencoded({ extended: false }));
exports.nestServer.use(cors());
const startNestApplication = async (expressInstance) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    await app.init();
};
void startNestApplication(exports.nestServer);
//# sourceMappingURL=nest-server.js.map