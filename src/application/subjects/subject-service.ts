import type { CreateSubjectInput, Subject } from "../../domain/subjects/subject";
import type { SubjectRepository } from "./ports/subject-repository";

export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly generateId: () => string = () => crypto.randomUUID(),
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async createSubject(input: CreateSubjectInput) {
    const name = input.name?.trim();
    if (!name) {
      return { ok: false as const, errors: ["Nome da matéria é obrigatório"] };
    }
    if (name.length > 100) {
      return { ok: false as const, errors: ["Nome da matéria deve ter no máximo 100 caracteres"] };
    }

    const now = this.clock().toISOString();
    const subject: Subject = {
      id: this.generateId(),
      name,
      createdAt: now,
      updatedAt: now,
    };

    return { ok: true as const, subject: await this.subjectRepository.create(subject) };
  }

  async listSubjects() {
    return this.subjectRepository.list();
  }

  async deleteSubject(id: string) {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) return { ok: false as const, errors: ["Matéria não encontrada"] };

    await this.subjectRepository.delete(id);
    return { ok: true as const };
  }
}
