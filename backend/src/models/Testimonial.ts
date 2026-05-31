import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  location: string;
  rating: number;
  text: string;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  clientName: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
