"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteAllTodo, deleteTodo } from "@/lib/actions/todosActions";
import toast from "react-hot-toast";

export function DeleteModel({
  userId,
  todoId,
  deleteAll = false,
}: {
  userId: string;
  todoId?: string;
  deleteAll?: boolean;
}) {
  const handleDelete = async () => {
    try {
      let res;
      if (deleteAll) {
        res = await deleteAllTodo(userId);
      } else if (todoId) {
        res = await deleteTodo(userId, todoId);
      } else {
        throw new Error("Missing required parameters for deletion.");
      }

      if (res.success) {
        toast.success(
          deleteAll
            ? "All tasks deleted successfully!"
            : "Task deleted successfully!"
        );
      } else {
        toast.error(res.error || "Failed to delete task.");
      }
    } catch (error) {
      toast.error(
        `Failed to delete task: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {deleteAll ? (
          <Button variant="ghost">Delete All</Button>
        ) : (
          <span className="text-red-500 block w-full">Delete</span>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {deleteAll ? "all tasks" : "this task"} from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
