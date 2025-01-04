"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { TodoType } from "@/types";
import { useState } from "react";
import { DeleteModel } from "./todoModels/DeleteModel";
import { ToggleModel } from "./todoModels/ToggleModel";

export function TodoOptions({
  todo,
  userId,
}: {
  todo: TodoType;
  userId: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <BsThreeDots size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1 cursor-pointer hover:bg-gray-600/30 duration-300">
          <ToggleModel todo={todo} />
        </div>
        <div className="p-1 cursor-pointer hover:bg-gray-600/30 duration-300">
          <DeleteModel userId={userId} todoId={todo._id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
