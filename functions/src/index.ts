/* eslint-disable prefer-const */
import * as functions from 'firebase-functions';
import { nestServer } from './api/nest-server';
import { database } from './api/product/database/product.database';

export const api = functions
  .runWith({ memory: '4GB', timeoutSeconds: 150 })
  .https.onRequest(nestServer);

export const onProductCreate = functions.firestore
  .document('products/{productId}')
  .onCreate(async (snap) => {
    const values = snap.data();
    await database.collection('logging').add({
      description: `A product was added with this name: ${values.name}, and description: ${values.description}`,
    });
  });

export const onProductUpdate = functions.firestore
  .document('products/{productId}')
  .onUpdate(async (snap) => {
    const newValues = snap.after.data();

    const previousValues = snap.before.data();

    if (newValues.name !== previousValues.name) {
      const snapshot = await database
        .collection('reviews')
        .where('name', '==', previousValues.name)
        .get();

      const updatePromises = [];
      snapshot.forEach((doc) => {
        updatePromises.push(
          database
            .collection('reviews')
            .doc(doc.id)
            .update({ name: newValues.name }),
        );
      });

      await Promise.all(updatePromises);
    }
  });
