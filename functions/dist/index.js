"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const nest_server_1 = require("./api/nest-server");
exports.api = functions
    .runWith({ memory: '2GB', timeoutSeconds: 150 })
    .https.onRequest(nest_server_1.nestServer);
//# sourceMappingURL=index.js.map