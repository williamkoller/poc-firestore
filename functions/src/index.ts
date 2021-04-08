import * as functions from 'firebase-functions';
import { nestServer } from './api/nest-server';
import { Logger } from '@nestjs/common';

export const api = functions
  .runWith({ memory: '4GB', timeoutSeconds: 150 })
  .https.onRequest(nestServer);

const logger = new Logger('Firebase Cloud Functions');
export const products = functions.firestore
  .document('products/{productId}')
  .onWrite(async (change, ctx) => {
    const document = change.after.exists ? change.after.data() : null;
    const seila = ctx.eventType;
    logger.log(`seila: ${JSON.stringify(seila)}`);

    const oldDocument = change.before.data();
    logger.log(`document: ${JSON.stringify(document)}`);
    logger.log(`oldDocument: ${JSON.stringify(oldDocument)}`);
  });
