"use client";

import { useState } from "react";
import { TodoType } from "@/types";
import { useSession } from "next-auth/react";
import { TodoSelect } from "./TodoSelect";
import { Input } from "@/components/ui/input";
import { updateTodo } from "@/lib/actions/todosActions";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { TodoOptions } from "./TodoOptions";

const Todo = ({ todo }: { todo: TodoType }) => {
  const [priority, setPriority] = useState(todo.priority);
  const [completed, setCompleted] = useState(todo.completed);
  const { data: session } = useSession();

  const handleUpdate = async (updates: Partial<TodoType>) => {
    if (!session?.user?.id) {
      toast.error("User not found");
      return;
    }
    try {
      const res = await updateTodo(session.user.id, todo._id, updates);
      if (res.success) {
        toast.success(res.success);
        if (updates.completed !== undefined) setCompleted(updates.completed);
        if (updates.priority) setPriority(updates.priority);
      } else {
        toast.error(res.error || "Failed to update todo");
      }
    } catch (error) {
      toast.error(`Failed to update todo: ${error}`);
    }
  };

  const handleCompleteChange = async () => {
    await handleUpdate({ completed: !completed });
  };

  const handlePriorityChange = async (newPriority: string) => {
    await handleUpdate({ priority: newPriority as TodoType["priority"] });
  };

  return (
    <div
      className={`p-3 rounded-xl border border-border flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center 
      ${completed ? "opacity-50" : "opacity-100"}`}
    >
      <div>
        <div className="flex items-center gap-2">
          <Input
            id={`todo-${todo._id}`}
            className="size-5"
            type="checkbox"
            checked={completed}
            onChange={handleCompleteChange}
          />
          <Label htmlFor={`todo-${todo._id}`} className="text-xl">
            {todo.title}
          </Label>
        </div>
        <span className="text-sm text-gray-400 border border-border rounded-lg pl-1 pr-20 ml-7">
          {completed ? "Completed" : "In progress"}
        </span>
      </div>
      <div className="flex items-center self-end gap-3">
        <TodoSelect
          selectedValue={priority}
          setSelectedValue={handlePriorityChange}
        />
        <TodoOptions todo={todo} userId={session?.user?.id as string} />
      </div>
    </div>
  );
};

export default Todo;
