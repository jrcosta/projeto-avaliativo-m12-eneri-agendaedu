import mongoose, { Schema } from "mongoose";
import type { Subject } from "../../../domain/subjects/subject";

const SubjectSchema = new Schema<Subject>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "subjects" }
);

export const SubjectModel =
  mongoose.models.Subject || mongoose.model<Subject>("Subject", SubjectSchema);
