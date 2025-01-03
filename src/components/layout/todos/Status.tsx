import { TodoType } from "@/types";

const Status = ({ todos }: { todos: TodoType[] }) => {
  const completedTodos = todos.filter((todo) => todo.completed == true);
  const pendingTodos = todos.filter((todo) => todo.completed == false);
  const progressTodos = (completedTodos.length / todos.length) * 100 || 0;
  return (
    <div className="text-center flex-col md:flex-row flex items-center mb-20 gap-5">
      <div className="border rounded-xl border-border p-10 w-full sm:flex-1">
        <h2 className="mb-3 text-gray-400 text-xl">Completed</h2>
        <p className="text-3xl font-bold">
          {completedTodos.length}{" "}
          <sub className="text-sm text-gray-500">Tasks</sub>
        </p>
      </div>
      <div className="border rounded-xl border-border p-10 w-full sm:flex-1">
        <h2 className="mb-3 text-gray-400 text-xl">Pending</h2>
        <p className="text-3xl font-bold">
          {pendingTodos.length}{" "}
          <sub className="text-sm text-gray-500">Tasks</sub>
        </p>
      </div>
      <div className="border rounded-xl border-border p-10 w-full sm:flex-1">
        <h2 className="mb-3 text-gray-400 text-xl">Progress</h2>
        <p className="text-3xl font-bold">
          {progressTodos.toFixed(0)}{" "}
          <sub className="text-sm text-gray-500">%</sub>
        </p>
      </div>
    </div>
  );
};

export default Status;
