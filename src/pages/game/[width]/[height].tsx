import { useRouter } from "next/router";
import { CSSProperties, useEffect } from "react";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { MAX_CARD_TYPES } from "@/modules/game/constants";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { getValidBoardHeight, getValidBoardWidth } from "@/modules/game/utils";
import { useCountdown } from "@/modules/common/hooks/useCountdown";

export default function Game() {
  const router = useRouter();

  const { width, height } = router.query;

  const { timeLeft, start } = useCountdown();

  const boardWidth = width ? +width : 0;
  const boardHeight = height ? +height : 0;

  const { cells, reset, flipAll } = useGameStore();

  useEffect(() => {
    const validWidth = getValidBoardWidth(boardWidth);
    const validHeight = getValidBoardHeight(boardHeight);
    reset(validWidth, validHeight);
  }, [boardWidth, boardHeight, reset]);

  // start initial timer after which all cards will be flipped
  useEffect(() => {
    start(5);
  }, [start]);

  // Flip all cards when initial timer reaches zero
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeout(() => {
        flipAll(true);
      }, 1000);
    }
  }, [timeLeft, flipAll]);

  return (
    <MainLayout>
      <span
        className={`countdown font-mono text-6xl ${
          timeLeft > 0 ? "" : "invisible"
        }`}
      >
        <span style={{ "--value": timeLeft } as CSSProperties}></span>
      </span>
      <div
        style={{
          margin: "auto 0",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
        }}
      >
        {cells.map((cell, i) => {
          return <GameCard value={cell.value} flipped={cell.flipped} key={i} />;
        })}
      </div>
    </MainLayout>
  );
}
