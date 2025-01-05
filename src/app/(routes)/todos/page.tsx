import { auth } from "@/auth";
import Status from "@/components/layout/todos/Status";
import Todo from "@/components/layout/todos/Todo";
import { DeleteModel } from "@/components/layout/todos/todoModels/DeleteModel";
import TodosHeader from "@/components/layout/todos/TodosHeader";
import { fetchUserTodos } from "@/lib/actions/todosActions";
import { TodoType } from "@/types";
import { FaUmbrellaBeach } from "react-icons/fa";

const Todos = async () => {
  const session = await auth();
  let todos: TodoType[] = [];

  try {
    todos = (await fetchUserTodos(session?.user?.id || "")) as TodoType[];
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return (
      <div className="text-red-500 text-center">
        Failed to load todos. Please try again later.
      </div>
    );
  }
  return (
    <div className="p-2 sm:p-7 rounded-xl border border-border w-full lg:w-[70%] mt-6 sm:mt-0 mb-10">
      <Status todos={todos} />
      <TodosHeader />

      {todos.length === 0 ? (
        <div className="flex flex-col text-gray-400 items-center justify-center h-[275px]">
          <FaUmbrellaBeach className="size-32 sm:size-40" />
          <h3 className="font-bold text-center max-w-[80%] sm:max-w-[40%]">
            It looks like there are no tasks available. Click above to add a new
            task.
          </h3>
        </div>
      ) : (
        <div className="space-y-4 sm:h-[275px] overflow-y-auto">
          {todos.map((todo: TodoType) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </div>
      )}

      {todos.length > 0 && (
        <div className="flex justify-between items-center mt-10">
          <h3 className="text-gray-400 font-bold">{todos.length} Tasks</h3>
          <DeleteModel deleteAll userId={session?.user?.id || ""} />
        </div>
      )}
    </div>
  );
};

export default Todos;
