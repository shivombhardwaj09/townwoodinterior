import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  category: string;
  readTime: number; // in minutes
  content: string;
  thumbnail: string;
  author: string;
  createdAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: Number, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  author: { type: String, default: 'Townwood Editorial' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
