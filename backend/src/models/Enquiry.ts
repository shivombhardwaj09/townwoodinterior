import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  status: string; // 'New', 'Contacted', 'Converted'
  createdAt: Date;
}

const enquirySchema = new Schema<IEnquiry>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  propertyType: { type: String, required: true },
  budgetRange: { type: String, required: true },
  timeline: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEnquiry>('Enquiry', enquirySchema);
