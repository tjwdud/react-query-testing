import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchRepoData = (): Promise<{ name: string }> =>
  axios.get("/react-query").then((response) => response.data);

export function useRepoData() {
  return useQuery(["repoData"], fetchRepoData);
}
