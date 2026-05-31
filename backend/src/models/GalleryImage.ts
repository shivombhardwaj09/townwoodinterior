import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage extends Document {
  url: string;
  category: string; // 'Living Room', 'Bedroom', 'Kitchen', etc.
  isTrending: boolean;
  createdAt: Date;
}

const galleryImageSchema = new Schema<IGalleryImage>({
  url: { type: String, required: true },
  category: { type: String, required: true },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGalleryImage>('GalleryImage', galleryImageSchema);
