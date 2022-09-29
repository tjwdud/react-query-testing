import * as React from "react";
import { useEffect, useState } from "react";
import { useTodoData, useMutationTodo } from "./todoHooks";
export function Todo() {
  // const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  // const [loading, setLoading] = useState(false);
  const { isLoading, error, data, isFetching } = useTodoData();
  const { mutate } = useMutationTodo();

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    mutate(todo);
    setTodo("");
  };
  return (
    <div>
      <h2>할일 목록</h2>
      <ul>
        {data?.map((elem: string, idx: number) => (
          <li key={idx}>{elem}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="새로운 할일"
          value={todo}
          onChange={({ target: { value } }) => setTodo(value)}
        />

        <button disabled={!todo}>추가</button>
      </form>
    </div>
  );
}
