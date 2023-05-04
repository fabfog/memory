import { useRouter } from "next/router";
import { useEffect } from "react";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { MAX_CARD_TYPES } from "@/modules/game/constants";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { getValidBoardHeight, getValidBoardWidth } from "@/modules/game/utils";

export default function Game() {
  const router = useRouter();

  const { width, height } = router.query;

  const boardWidth = width ? +width : 0;
  const boardHeight = height ? +height : 0;

  const { cells, reset } = useGameStore();

  useEffect(() => {
    const validWidth = getValidBoardWidth(boardWidth);
    const validHeight = getValidBoardHeight(boardHeight);
    reset(validWidth, validHeight, MAX_CARD_TYPES);
  }, [boardWidth, boardHeight, reset]);

  return (
    <MainLayout>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
        }}
      >
        {new Array(cells.length).fill(0).map((cell, i) => (
          <GameCard value={cell.value} key={i} />
        ))}
      </div>
    </MainLayout>
  );
}
