import { deleteTask, getFullTasks, insertTask } from "@/server/db/crud";
import { NextRequest } from "next/server";

const GET = async () => {
  try {
    return Response.json(await getFullTasks());
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, {
        status: 500,
      });
    }
  }
};

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const inserted = await insertTask(body);
    return Response.json(inserted);
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
  }
};

const DELETE = async (req: NextRequest) => {
  try {
    const taskId = req.headers.get("TaskId");
    await deleteTask(taskId);
    return Response.json({ message: "Task deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
  }
};

const PATCH = () => {
  try {
  } catch (err) {
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
  }
};

export { GET, POST, DELETE, PATCH };
