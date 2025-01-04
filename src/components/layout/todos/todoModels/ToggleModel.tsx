"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addTodo, updateTodo } from "@/lib/actions/todosActions";
import { useSession } from "next-auth/react";
import { TodoType } from "@/types";

const priorities = ["low", "medium", "high"];

export function ToggleModel({ todo }: { todo?: TodoType }) {
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [priority, setPriority] = useState(todo ? todo.priority : "medium");
  const [completed, setCompleted] = useState(todo ? todo.completed : false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setPriority(todo.priority);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = async () => {
    const todoData = {
      title,
      priority,
      completed,
    };
    try {
      let res;
      if (todo) {
        res = await updateTodo(
          session?.user?.id as string,
          todo._id as string,
          todoData
        );
      } else {
        res = await addTodo(session?.user?.id || "", todoData);
      }
      if (res.success) {
        setTitle("");
        setPriority("medium");
        setCompleted(false);
        setIsOpen(false); // Close the dialog
        toast.success(res.success);
        // window.location.reload();
      } else {
        toast.error(res.error || "Failed to process todo");
      }
    } catch (error) {
      toast.error(`Failed to process todo: ${error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {todo ? (
          <span className="block w-full">Edit</span>
        ) : (
          <Button>Add Task</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>
            {todo
              ? "Edit the task details below."
              : "Add a new task to your list by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-lg">
              Name
            </Label>
            <Input
              value={title}
              id="name"
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-3 mt-5">
            <div className="grid gap-2">
              <Label htmlFor="Priority" className="text-lg">
                Priority
              </Label>
              <Select
                defaultValue={priority}
                onValueChange={setPriority as any}
              >
                <SelectTrigger className="w-[130px] sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((option) => (
                    <SelectItem
                      className="capitalize"
                      key={option}
                      value={option}
                    >
                      <span
                        className={`inline-block size-3 rounded-full mr-2 ${
                          option === "low"
                            ? "bg-green-500"
                            : option === "medium"
                            ? "bg-yellow-500"
                            : option === "high"
                            ? "bg-red-500"
                            : ""
                        }`}
                      />
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Status" className="text-lg">
                Status
              </Label>
              <Select
                defaultValue={completed ? "completed" : "in progress"}
                onValueChange={(value) => setCompleted(value === "completed")}
              >
                <SelectTrigger className="w-[130px] sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit} type="submit">
              {todo ? "Save changes" : "Add Task"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
