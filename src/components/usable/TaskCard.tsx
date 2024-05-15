"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { removeTask, updateTaskStatus } from "@/app/actions";
import { toast } from "../ui/use-toast";
import moment from "moment";
import { Task } from "@/lib/types";
import { useState } from "react";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const deleteTaskFromList = async (taskId: string) => {
    await removeTask(taskId);
    toast({
      title: "Задача успешно удалено",
    });
  };

  // const updateTaskAndSetId = (taskId: string) => {
  //   updateTask(taskId);
  // };

  const [did, setDid] = useState<boolean>(false);
  const updateStatus = async () => {
    try {
      setDid((prev) => !prev);
      const ret = await updateTaskStatus(task.id, did);
      return ret;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  return (
    <Card className={cn("break-inside-avoid mb-5")}>
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between font-serif text-xl "
          )}
        >
          <CardTitle>{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsVerticalIcon
                className={cn(
                  "hover:bg-secondary w-[30px] h-[30px] p-1 rounded-sm cursor-pointer"
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem
                className={cn("gap-2 cursor-pointer")}
                // onClick={() => updateTaskAndSetId(task.id)}
              >
                <Pencil2Icon /> Изменить
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn("gap-2 cursor-pointer text-red-500")}
                onClick={() => deleteTaskFromList(task.id)}
              >
                <TrashIcon /> Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className={cn("text-sm text-[#5b5b5b]")}>
          {task.description}
        </CardContent>
        <CardFooter
          className={cn(
            `flex ${task.deadline ? "justify-between" : "justify-end"}`
          )}
        >
          {task.deadline && (
            <div className="leading-none">
              <small className="mb-0 ">Дедлайн</small>
              <p className="text-sm font-semibold">
                {moment(task.deadline).format("DD MMMM Y")}
              </p>
            </div>
          )}

          <Button disabled={task.task_status} onClick={updateStatus}>
            Выполнено
          </Button>
        </CardFooter>
    </Card>
  );
};

export default TaskCard;
