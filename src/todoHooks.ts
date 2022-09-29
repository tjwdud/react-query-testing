import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTodos = (): Promise<Array<string>> =>
  axios.get("/todos").then((response) => response.data);

const addTodos = (newTodo: string) => axios.post("/todos", newTodo);

export const useTodoData = () => {
  return useQuery(["todos"], fetchTodos);
};

export const useMutationTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((newTodo: string) => addTodos(newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return mutation;
};
