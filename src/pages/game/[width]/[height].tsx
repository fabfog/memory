import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { getValidBoardHeight, getValidBoardWidth } from "@/modules/game/utils";
import { useCountdown } from "@/modules/common/hooks/useCountdown";

export default function Game() {
  const router = useRouter();
  const { width, height } = router.query;
  const boardWidth = width ? +width : 0;
  const boardHeight = height ? +height : 0;

  const { cells, reset, flipAll, flipCell } = useGameStore();

  // sets board dimensions, initializing cells
  useEffect(() => {
    const validWidth = getValidBoardWidth(boardWidth);
    const validHeight = getValidBoardHeight(boardHeight);
    reset(validWidth, validHeight);
  }, [boardWidth, boardHeight, reset]);

  const { start: startInitialCountdown, timeLeft: timeLeftToStart } =
    useCountdown();

  const isGameStarted = timeLeftToStart === 0;

  // start initial timer after which all cards will be flipped
  useEffect(() => {
    flipAll(false);
    startInitialCountdown(5);
  }, [startInitialCountdown, flipAll]);

  // Flip all cards when initial timer reaches zero
  useEffect(() => {
    if (isGameStarted) {
      setTimeout(() => {
        flipAll(true);
      }, 500);
    }
  }, [isGameStarted, flipAll]);

  // this flag is set true after the user has picked the wrong card
  const [isFlippingDisabled, setIsFlippingDisabled] = useState(false);

  const canFlipCards = isGameStarted && !isFlippingDisabled;

  return (
    <MainLayout>
      <span
        className={`countdown font-mono text-6xl ${
          isGameStarted ? "invisible" : ""
        }`}
      >
        {/* 
          I added an explicit cast because TypeScript is not happy with --value
          TODO: find a cleaner solution
        */}
        <span style={{ "--value": timeLeftToStart } as CSSProperties} />
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
          return (
            <button
              disabled={!canFlipCards}
              key={i}
              onClick={() => flipCell(i)}
            >
              <GameCard value={cell.value} flipped={cell.flipped} />
            </button>
          );
        })}
      </div>
    </MainLayout>
  );
}
