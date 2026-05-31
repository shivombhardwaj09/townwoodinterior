import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  startingPrice: number;
  icon?: string;
  order: number;
}

const serviceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
});

export default mongoose.model<IService>('Service', serviceSchema);
