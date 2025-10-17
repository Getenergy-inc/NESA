import mongoose from 'mongoose';

const NRC_DATABASE_URL = process.env.NRC_DATABASE_URL;

// Don't throw error during build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

if (!NRC_DATABASE_URL && !isBuildTime) {
  console.warn('NRC_DATABASE_URL not defined, using default MONGODB_URI');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseNRC: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseNRC || { conn: null, promise: null };

if (!global.mongooseNRC) {
  global.mongooseNRC = cached;
}

async function connectNRCDB(): Promise<typeof mongoose> {
  if (isBuildTime) {
    throw new Error('Database connection not available during build time');
  }

  const connectionString = NRC_DATABASE_URL || process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error('Please define NRC_DATABASE_URL or MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached.promise = mongoose.createConnection(connectionString, opts).asPromise().then((connection) => {
      console.log('✅ Connected to NRC MongoDB');
      return connection as any;
    }).catch((error) => {
      console.error('❌ NRC MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectNRCDB;
