export function TaskForm() {
  return (
    <form aria-label="Nova tarefa escolar">
      <input name="title" placeholder="Título" />
      <input name="subject" placeholder="Matéria" />
      <input name="dueDate" type="date" />
      <input name="weight" min="1" max="10" type="number" />
      <button type="submit">Criar tarefa</button>
    </form>
  );
}
