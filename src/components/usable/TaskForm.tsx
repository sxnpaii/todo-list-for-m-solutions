"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { postTask } from "@/app/actions";
import { zodSchema } from "@/lib/types";



const TaskForm = () => {
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      task_status: false,
    },
  });

  const { pending } = useFormStatus();

  const onSubmit = async (data: z.infer<typeof zodSchema>) => {
    try {
      const fromServer = await postTask(data);

      if (fromServer) {
        toast({
          title: "Задача успешно назначено",
          description: `
          Задача: '${
            fromServer.title
          }' назначено на дату ${fromServer.deadline.toDateString()}
          Можете проверить в списке`,
        });
      }
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  };
  return (
    <Drawer>
      <div className="group fixed bottom-3 w-full mx-2 md:w-1/2 rounded-2xl h-20 shadow-2xl flex items-center justify-center bg-secondary hover:w-full hover:h-24 transition-all">
        <DrawerTrigger
          asChild
          className={cn(
            "absolute bottom-5 group-hover:bottom-7 transition-all"
          )}
        >
          <Button>Добавить Задачу</Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className={cn("flex items-center bg-secondary")}>
        <Form {...form}>
          <form
            className={cn(`mt-7 sm:w-1/3 w-[90%]`)}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите задачу</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Что будем делать?"
                      className={cn("transition-all bg-white")}
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введите дополнительную инфу</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Давайте пояснеем"
                      className={cn(
                        "transition-all bg-white resize-none min-h-20"
                      )}
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите дату выполнения</FormLabel>
                  <FormControl>
                    <Input
                      className={cn("transition-all bg-white")}
                      type="date"
                      disabled={pending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn("my-5 w-full")}
              disabled={pending}
            >
              Назначить
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default TaskForm;
