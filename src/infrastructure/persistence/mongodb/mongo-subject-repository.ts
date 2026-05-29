import type { Subject } from "../../../domain/subjects/subject";
import type { SubjectRepository } from "../../../application/subjects/ports/subject-repository";
import { connectToDatabase } from "../../../lib/mongodb";
import { SubjectModel } from "./subject-model";

export class MongoSubjectRepository implements SubjectRepository {
  async create(subject: Subject) {
    await connectToDatabase();
    await SubjectModel.create(subject);
    return subject;
  }

  async list() {
    await connectToDatabase();
    const subjects = await SubjectModel.find({}).sort({ name: 1 }).lean();
    return subjects as unknown as Subject[];
  }

  async findById(id: string) {
    await connectToDatabase();
    const subject = await SubjectModel.findOne({ id }).lean();
    return (subject as unknown as Subject) ?? null;
  }

  async delete(id: string) {
    await connectToDatabase();
    const result = await SubjectModel.deleteOne({ id });
    return result.deletedCount === 1;
  }
}
