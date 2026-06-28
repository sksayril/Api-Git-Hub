import mongoose, { Schema, model, models } from "mongoose";
import type { IProjectCategory } from "./ProjectCategory";

export interface IProject {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  descriptionMarkdown: string;
  images: string[];
  actualPrice: number;
  discountPrice: number;
  url: string;
  tags: string[];
  category: mongoose.Types.ObjectId | IProjectCategory;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    descriptionMarkdown: { type: String, required: true, trim: true },
    images: [{ type: String, trim: true }],
    actualPrice: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0, default: 0 },
    url: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    category: { type: Schema.Types.ObjectId, ref: "ProjectCategory", required: true },
    categoryName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;
