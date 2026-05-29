import { SubjectService } from "../../../application/subjects/subject-service";
import { MongoSubjectRepository } from "../../../infrastructure/persistence/mongodb/mongo-subject-repository";

const subjectService = new SubjectService(new MongoSubjectRepository());

export async function GET() {
  const subjects = await subjectService.listSubjects();
  return Response.json({ subjects });
}

export async function POST(request: Request) {
  const input = await request.json();
  const result = await subjectService.createSubject(input);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  return Response.json({ subject: result.subject }, { status: 201 });
}
