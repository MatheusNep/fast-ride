import mongoose, { Schema, Document } from 'mongoose';

export interface DriverInterface extends Document {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
  limit: number;
}

const DriversSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    vehicle: { type: String, required: true },
    review: {
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
    value: { type: Number, required: true },
    limit: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<DriverInterface>('Driver', DriversSchema);