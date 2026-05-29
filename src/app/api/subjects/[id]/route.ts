import { SubjectService } from "../../../../application/subjects/subject-service";
import { MongoSubjectRepository } from "../../../../infrastructure/persistence/mongodb/mongo-subject-repository";

const subjectService = new SubjectService(new MongoSubjectRepository());

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const result = await subjectService.deleteSubject(params.id);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
