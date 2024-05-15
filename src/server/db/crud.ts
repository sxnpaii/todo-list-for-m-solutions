import { Task, zodSchema } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
import { z } from "zod";
const getFullTasks = async () => {
  const { rows } = await sql`
  SELECT * FROM tasks;
  `;

  return rows;
};
const insertTask = async (values: z.infer<typeof zodSchema>) => {
  const { rows } = await sql`
        INSERT INTO tasks (id, title, description, deadline, task_status)
        VALUES (${uuid()}, ${values.title}, ${values.description}, ${
    values.deadline
  }, ${values.task_status})
        RETURNING title, deadline;
        `;
  return rows[0];
};

const deleteTask = async (id: string | null) => {
  try {
    const deleteInfo = await sql`DELETE FROM tasks WHERE id=${id}`;
    return deleteInfo;
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
  }
};

export { getFullTasks, insertTask, deleteTask };
