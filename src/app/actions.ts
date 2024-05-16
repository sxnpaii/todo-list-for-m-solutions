"use server";

import { zodSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const getAlltasks = async () => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      cache: "force-cache",
    });
    if (!resp.ok) {
      throw new Error("Failed to fetch task data");
    }
    return await resp.json();
  } catch (err) {
    if (err instanceof Error) {
      return console.log(err.message);
    }
  }
};

const postTask = async (reqBody: z.infer<typeof zodSchema>) => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      method: "POST",
      body: JSON.stringify(reqBody),
    });
    revalidatePath("/");
    return await req.json();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error at insertion: ${err.message}`);
    }
  }
};

const removeTask = async (taskId: string) => {
  try {
    const info = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      method: "DELETE",
      headers: {
        TaskId: taskId,
      },
    });
    revalidatePath("/");
    return await info.json();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

// small actions

// const updateTask = async (
//   taskId: string,
//   reqBody?: z.infer<typeof zodSchema>
// ) => {
//   try {
//     let taskID = "";
//     console.log(taskID);

//     if (reqBody && taskID !== "") {
//       console.log(taskID);
//       const updated = await fetch("http://${location.origin}/api/tasks", {
//         method: "PATCH",
//         headers: {
//           TakId: taskID,
//         },
//         body: JSON.stringify(reqBody),
//       });
//       const returned = await updated.json();
//       revalidatePath("/");
//       return returned;
//     } else {
//       return (taskID = taskId);
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log(err.message);
//     }
//   }
// };

const updateTaskStatus = async (taskID: string, status: boolean) => {
  try {
    const info = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskID}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    revalidatePath("/");
    return await info.json();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export { getAlltasks, postTask, removeTask, updateTaskStatus };
