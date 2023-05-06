import { act, renderHook } from "@testing-library/react";
import { useGameStore } from "./store";

describe("reset", () => {
  it("should create board of given dimensions", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(3, 4);
    });
    expect(result.current.cells).toHaveLength(12);
  });

  it("should raise exception if dimensions are invalid", () => {
    const { result } = renderHook(() => useGameStore());
    expect(() => {
      result.current.reset(3, 3);
    }).toThrowError("Invalid array length");
  });
});

describe("pickCard", () => {
  it("should track moves and flip cells", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2, (x) => x);
      result.current.flipAll(true);
    });
    expect(result.current.moves).toHaveLength(0);
    expect(result.current.cells.every((c) => c.flipped)).toBe(true);

    // pick first card
    act(() => {
      result.current.pickCard(0);
    });
    expect(result.current.moves).toHaveLength(1);
    expect(result.current.moves[0]).toEqual({ pickedCard1: 0 });
    expect(result.current.cells[0].flipped).toBe(false);

    // pick second card
    act(() => {
      result.current.pickCard(2);
    });
    expect(result.current.moves).toHaveLength(1);
    expect(result.current.moves[0]).toEqual({ pickedCard1: 0, pickedCard2: 2 });
    expect(result.current.cells[2].flipped).toBe(false);

    // pick third card (second move)
    act(() => {
      result.current.pickCard(1);
    });
    expect(result.current.moves).toHaveLength(2);
    expect(result.current.moves[1]).toEqual({ pickedCard1: 1 });
    expect(result.current.cells[1].flipped).toBe(false);
  });
});

describe("flipAll", () => {
  it("should flip all cards", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2);
    });
    expect(result.current.cells.every((c) => !c.flipped)).toEqual(true);

    // flip all true
    act(() => {
      result.current.flipAll(true);
    });
    expect(result.current.cells.every((c) => c.flipped)).toEqual(true);

    // flip all false
    act(() => {
      result.current.flipAll(false);
    });
    expect(result.current.cells.every((c) => !c.flipped)).toEqual(true);
  });
});

describe("flipCell", () => {
  it("should flip single card", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2, (x) => x);
    });
    expect(result.current.cells.every((c) => !c.flipped)).toEqual(true);

    act(() => {
      result.current.flipCell(0, true);
    });
    expect(result.current.cells[0]).toEqual({ value: 0, flipped: true });
  });
});

describe("isMoveComplete", () => {
  it("should detect complete move", () => {
    const { result } = renderHook(() => useGameStore());
    expect(
      result.current.isMoveComplete({ pickedCard1: 1, pickedCard2: 2 })
    ).toEqual(true);
  });
  it("should detect incomplete move", () => {
    const { result } = renderHook(() => useGameStore());
    expect(result.current.isMoveComplete({ pickedCard1: 1 })).toEqual(false);
  });
});

describe("isMoveCorrect", () => {
  it("should detect correct move", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2, (x) => x);
    });

    expect(
      result.current.isMoveCorrect({ pickedCard1: 0, pickedCard2: 2 })
    ).toEqual(true);
  });

  it("should detect incorrect move", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2, (x) => x);
    });

    expect(
      result.current.isMoveCorrect({ pickedCard1: 0, pickedCard2: 1 })
    ).toEqual(false);
  });
});

describe("isGameComplete", () => {
  it("should detect when all cells are flipped", () => {
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.reset(2, 2, (x) => x);
      result.current.flipAll(true);
    });

    expect(result.current.isGameComplete()).toEqual(false);

    act(() => {
      result.current.pickCard(0);
    });
    expect(result.current.isGameComplete()).toEqual(false);

    act(() => {
      result.current.pickCard(2);
    });
    expect(result.current.isGameComplete()).toEqual(false);

    act(() => {
      result.current.pickCard(1);
    });
    expect(result.current.isGameComplete()).toEqual(false);

    act(() => {
      result.current.pickCard(3);
    });
    expect(result.current.isGameComplete()).toEqual(true);
  });
});
