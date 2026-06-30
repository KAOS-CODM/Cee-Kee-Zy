import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;
export const AdminUser = mongoose.model('AdminUser', adminUserSchema);

