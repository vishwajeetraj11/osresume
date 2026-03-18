import mongoose from 'mongoose';
import getMongoUri from './getMongoUri';

const MONGO_URI = getMongoUri();
const EXPECTED_DB_NAME = MONGO_URI.match(/\/\/[^/]+\/([^?]+)/)?.[1];

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null, uri: null };
  global.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  // In dev, Next.js can reload this module while Mongoose is still connected.
  // Reuse the active connection instead of calling openUri again.
  if (mongoose.connection.readyState === 1) {
    const activeDbName = mongoose.connection?.db?.databaseName;
    if (!EXPECTED_DB_NAME || !activeDbName || activeDbName === EXPECTED_DB_NAME) {
      cached.conn = mongoose;
      cached.uri = MONGO_URI;
      return cached.conn;
    }

    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    cached.uri = null;
  }

  if (!cached.promise || cached.uri !== MONGO_URI) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.uri = MONGO_URI;
    cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => mongoose).catch(error => {
      cached.promise = null;
      cached.uri = null;
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
