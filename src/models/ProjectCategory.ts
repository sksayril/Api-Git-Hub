import mongoose, { Schema, model, models } from "mongoose";

export interface IProjectCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectCategorySchema = new Schema<IProjectCategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    logoUrl: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const ProjectCategory =
  models.ProjectCategory || model<IProjectCategory>("ProjectCategory", ProjectCategorySchema);

export default ProjectCategory;
