import mongoose, { Document, Schema } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  department: string; // 'Leadership', 'Design Team', 'Project Management'
  bio: string;
  image: string;
  order: number;
}

const teamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export default mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);
