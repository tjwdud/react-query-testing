import { rest } from "msw";
import * as React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { act } from "react-dom/test-utils";
import { createWrapper } from "./utils";
import { useTodoData, useMutationTodo } from "../todoHooks";

describe("todo 받아오는 hook 테스트", () => {
  test("todo 받아오기 성공", async () => {
    const { result } = renderHook(() => useTodoData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toContain("먹기");
  });

  test("todo 받아오기 실패", async () => {
    server.use(
      rest.get("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useTodoData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});

describe("새로운 todo 등록하는 hook 테스트", () => {
  test("todo 받아오기 성공", async () => {
    const { result } = renderHook(() => useMutationTodo(), {
      wrapper: createWrapper(),
    });
    act(() => {
      result.current.mutate("운동하기");
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.data).toContain("운동하기");
  });

  test("todo 받아오기 실패", async () => {
    server.use(
      rest.post("*", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useMutationTodo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(result.current.error).toBeDefined();
  });
});
