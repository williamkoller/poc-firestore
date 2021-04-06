import * as functions from 'firebase-functions';
import { nestServer } from '@/api/nest-server';

export const api = functions
  .runWith({ memory: '2GB', timeoutSeconds: 150 })
  .https.onRequest(nestServer);
