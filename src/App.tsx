import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Example } from "./Example";
import { Todo } from "./Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Example />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
