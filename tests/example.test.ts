import { describe, expect, it } from "vitest";

describe("Example test suite", () => {
  it("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string comparison", () => {
    expect("hello").toBe("hello");
  });

  it("should verify Codecov integration", () => {
    const result = [1, 2, 3].map((n) => n * 2);
    expect(result).toEqual([2, 4, 6]);
  });
});
