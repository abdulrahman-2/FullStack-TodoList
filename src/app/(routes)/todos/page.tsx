"use client";

import { useSession } from "next-auth/react";

const Todos = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>todos</h1>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user?.name}</h1>
    </div>
  );
};

export default Todos;
