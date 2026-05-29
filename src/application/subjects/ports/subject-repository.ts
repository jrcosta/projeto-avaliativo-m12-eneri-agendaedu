import type { Subject } from "../../../domain/subjects/subject";

export interface SubjectRepository {
  create(subject: Subject): Promise<Subject>;
  list(): Promise<Subject[]>;
  findById(id: string): Promise<Subject | null>;
  delete(id: string): Promise<boolean>;
}
