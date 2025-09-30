import mongoose from 'mongoose';

const ENDORSEMENT_MONGODB_URI = process.env.ENDORSEMENT_MONGODB_URI;

// Don't throw error during build time if ENDORSEMENT_MONGODB_URI is not available
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

if (!ENDORSEMENT_MONGODB_URI && !isBuildTime) {
  throw new Error('Please define the ENDORSEMENT_MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Global is used here to maintain a cached connection across hot reloads in development
declare global {
  var mongooseEndorsement: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseEndorsement || { conn: null, promise: null };

if (!global.mongooseEndorsement) {
  global.mongooseEndorsement = cached;
}

async function connectEndorsementDB(): Promise<typeof mongoose> {
  // During build time, don't attempt to connect to database
  if (isBuildTime) {
    throw new Error('Database connection not available during build time');
  }

  // Check if ENDORSEMENT_MONGODB_URI is available at runtime
  if (!ENDORSEMENT_MONGODB_URI) {
    throw new Error('Please define the ENDORSEMENT_MONGODB_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose.connect(ENDORSEMENT_MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to Endorsement MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('❌ Endorsement MongoDB connection error:', error);
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

export default connectEndorsementDB;