// @flow
import mongoose from 'mongoose';
import { env } from '../configs/env';

export async function connect(): Promise<void> {
  // if we already have a connection, skip
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    mongoose.connect(env.mongoDBConnectionString, {
      useNewUrlParser: true,
      readPreference: 'nearest',
    });

    mongoose.connection.on('error', console.error);

    mongoose.set('debug', env.isDev);
  } catch (error) {
    console.error(error);
  }
}
