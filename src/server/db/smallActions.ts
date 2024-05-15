import { sql } from "@vercel/postgres";

const updateTaskStatus = async (taskId: string, status: boolean) => {
  try {
    const mess = await sql`
    UPDATE tasks
    SET task_status = ${status}
    WHERE id = ${taskId}
    RETURNING title, deadline, task_status;
    `;
    return mess.rows[0];
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};

export { updateTaskStatus };
