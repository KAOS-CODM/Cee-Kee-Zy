import mongoose from 'mongoose';
import { useMockDatabase } from './databaseMode';

export async function connectMongo(): Promise<void> {
  if (useMockDatabase){
    console.log("[database] Using Mock Database");
    return;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI');
  mongoose.set('strictQuery', true);
  mongoose.set('bufferCommands', false);
  await mongoose.connect(uri);
  console.log("[database] Connected to MongoDB");
  console.log("Database:", mongoose.connection.db?.databaseName);
  console.log("Host:", mongoose.connection.host);
  console.log("Ready State:", mongoose.connection.readyState);
}

