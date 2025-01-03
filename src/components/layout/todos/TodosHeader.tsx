import React from "react";
import { AddModel } from "./todoModels/AddModel";

const TodosHeader = () => {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h3 className="text-2xl mb-1 font-bold">{`Today's Tasks`}</h3>
        {/* date */}
        <span className="text-sm text-gray-400">
          {new Date().toDateString()}
        </span>
      </div>
      <AddModel />
    </div>
  );
};

export default TodosHeader;
