import TaskCard from "@/components/usable/TaskCard";
import TaskForm from "@/components/usable/TaskForm";
import { getAlltasks } from "./actions";
import { Task } from "@/lib/types";

export default async function Home() {
  const allTasks = await getAlltasks();
  return (
    <main className="flex flex-col items-center">
      {/* should component */}
      <header className="bg-secondary py-5 rounded-3xl w-full">
        <h1 className="font-semibold text-center text-2xl font-serif">
          Заметки и Задачи
        </h1>
      </header>
      <section className="w-full flex items-center justify-between mt-5">
        <p>Все заметки</p>
      </section>

      <section
        className="pt-5  max-sm:columns-1 sm:columns-2 lg:columns-3 2xl:columns-4
       gap-5 mb-28 transition-all"
      >
        {allTasks &&
          allTasks.map((el: Task) => <TaskCard key={el.id} task={el} />)}
      </section>
      <TaskForm />
    </main>
  );
}
