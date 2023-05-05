import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { useCountdown } from "@/modules/common/hooks/useCountdown";
import { areBoardDimensionsValid } from "@/modules/game/utils";

export default function Game() {
  const router = useRouter();
  const { width, height } = router.query;

  const error = width && height && !areBoardDimensionsValid(+width, +height);
  const { cells, reset, flipAll, flipCell } = useGameStore();

  // sets board dimensions, initializing cells
  useEffect(() => {
    if (!error && width && height) {
      reset(+width, +height);
    }
  }, [width, height, reset, error]);

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
  const shouldHideTimer = isGameStarted || error;

  return (
    <MainLayout>
      <div
        className={`font-mono text-center ${
          shouldHideTimer ? "invisible" : ""
        }`}
      >
        <p className="text-xl">GET READY!</p>
        <span className="countdown text-6xl">
          {/* 
          I added an explicit cast because TypeScript is not happy with --value
          TODO: find a cleaner solution
        */}
          <span style={{ "--value": timeLeftToStart } as CSSProperties} />
        </span>
      </div>

      {error && (
        <div className="sm:container alert alert-error shadow-lg">
          {/* TODO add more specific error message here */}
          <span className="text-lg">Error! Could not start game.</span>
        </div>
      )}
      <div
        style={{
          margin: "auto 0",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: `repeat(${width}, 1fr)`,
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
