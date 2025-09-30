import mongoose from 'mongoose';

const SPONSOR_MONGODB_URI = process.env.SPONSOR_MONGODB_URI || process.env.ENDORSEMENT_MONGODB_URI;

// Don't throw error during build time if SPONSOR_MONGODB_URI is not available
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

if (!SPONSOR_MONGODB_URI && !isBuildTime) {
  throw new Error('Please define the SPONSOR_MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a separate global variable for sponsor database connection
declare global {
  var mongooseSponsor: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseSponsor || { conn: null, promise: null };

if (!global.mongooseSponsor) {
  global.mongooseSponsor = cached;
}

async function connectSponsorDB(): Promise<typeof mongoose> {
  // During build time, don't attempt to connect to database
  if (isBuildTime) {
    throw new Error('Sponsor database connection not available during build time');
  }

  // Check if SPONSOR_MONGODB_URI is available at runtime
  if (!SPONSOR_MONGODB_URI) {
    throw new Error('Please define the SPONSOR_MONGODB_URI environment variable');
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

    cached.promise = mongoose.connect(SPONSOR_MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to Sponsor MongoDB');
      return mongoose;
    }).catch((error) => {
      console.error('❌ Sponsor MongoDB connection error:', error);
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

export default connectSponsorDB;