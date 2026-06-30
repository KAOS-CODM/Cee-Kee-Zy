import mongoose from "mongoose";

export function isMongoConnected():

boolean {
    return mongoose.connection.readyState === 1;
}