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

const priorities = ["low", "medium", "high"];

const Todo = ({ todo }: { todo: TodoType }) => {
  const [priority, setPriority] = useState(todo.priority);
  const [completed, setCompleted] = useState(todo.completed);
  const { data: session } = useSession();

  const handleCompleteChange = async () => {
    if (!session?.user?.id) {
      toast.error("User not found");
      return;
    }
    try {
      const res = await updateTodo(session.user.id, todo._id, {
        completed: !completed,
      });
      if (res.success) {
        toast.success(res.success);
        setCompleted(!completed);
      } else {
        toast.error(res.error || "Failed to update completion status");
      }
    } catch (error) {
      toast.error(`Failed to update completion status: ${error}`);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!session?.user?.id) {
      toast.error("User not found");
      return;
    }
    try {
      const res = await updateTodo(session.user.id, todo._id, {
        priority: newPriority,
      });
      if (res.success) {
        toast.success(res.success);
        setPriority(newPriority as "low" | "medium" | "high");
      } else {
        toast.error(res.error || "Failed to update priority");
      }
    } catch (error) {
      toast.error(`Failed to update priority: ${error}`);
    }
  };

  return (
    <div
      className={`p-3 rounded-xl border border-border flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center 
      ${todo.completed ? "opacity-50" : "opacity-100"}`}
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
          {todo.completed ? "Completed" : "in progress"}
        </span>
      </div>
      <div className="flex items-center self-end gap-3">
        <TodoSelect
          data={priorities}
          selectedValue={priority}
          setSelectedValue={handlePriorityChange}
        />
        <TodoOptions todo={todo} userId={session?.user?.id as string} />
      </div>
    </div>
  );
};

export default Todo;
