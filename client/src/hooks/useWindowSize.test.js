import useWindowSize from "./useWindowSize";
import { renderHook, act } from "@testing-library/react-hooks";
import { fireEvent } from "@testing-library/react";

describe("useWindowSize", () => {
  test("Returns correct window size", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);

    act(() => {
      window.innerHeight = 500;
      window.innerWidth = 500;

      fireEvent(window, new Event("resize"));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(500);
  });
});
