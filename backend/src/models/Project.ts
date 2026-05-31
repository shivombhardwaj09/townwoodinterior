import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string; // 'Residential', 'Luxury', 'Modular Kitchen', 'Commercial', 'Wardrobe', 'Living Room'
  location: string;
  areaSqFt: number;
  description: string;
  thumbnail: string;
  images: string[];
  clientTestimonial?: string;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  areaSqFt: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [{ type: String }],
  clientTestimonial: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', projectSchema);
