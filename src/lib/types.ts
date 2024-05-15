import z from "zod";

interface Task {
  id: string;
  title: string;
  description: string;
  task_status: boolean;
  deadline: Date | null;
}

const zodSchema = z.object({
  title: z
    .string({ required_error: "Это обязательное поле" })
    .min(6, { message: "Давайте делаем понятнее" }),
  description: z.string().optional(),
  deadline: z.string().optional(),
  task_status: z.boolean(),
});

export { type Task, zodSchema };
