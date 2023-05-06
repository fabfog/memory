import { useRouter } from "next/router";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { useCountdown } from "@/modules/common/hooks/useCountdown";
import { areBoardDimensionsValid } from "@/modules/game/utils";
import Link from "next/link";
import Image from "next/image";

export default function Game() {
  const router = useRouter();
  const { width, height } = router.query;

  // Check board dimensions error
  const error = width && height && !areBoardDimensionsValid(+width, +height);

  const {
    cells,
    moves,
    isMoveCorrect,
    isMoveComplete,
    isGameComplete,
    reset,
    flipAll,
    flipCell,
    pickCard,
  } = useGameStore();

  // sets board dimensions, initializing cells
  useEffect(() => {
    if (!error && width && height) {
      reset(+width, +height);
    }
  }, [width, height, reset, error]);

  const { start: startCountdown, timeLeft: timeLeftToStart } = useCountdown();

  const isGameStarted = timeLeftToStart === 0;

  useEffect(() => {
    // force all cards to be visible
    flipAll(false);
    // start initial timer after which all cards will be flipped
    startCountdown(5);
  }, [startCountdown, flipAll]);

  // Flip all cards when initial timer reaches zero
  useEffect(() => {
    if (isGameStarted) {
      flipAll(true);
    }
  }, [isGameStarted, flipAll]);

  // this flag is set true after the user has picked the wrong card
  const [isFlippingDisabled, setIsFlippingDisabled] = useState(false);

  const shouldShowWrongMoveError = useMemo(() => {
    const lastMove = moves.slice(-1)[0];
    return isFlippingDisabled && lastMove;
  }, [moves, isFlippingDisabled]);

  useEffect(() => {
    const lastMove = moves.slice(-1)[0];
    let timer: NodeJS.Timer;

    if (
      isGameStarted &&
      lastMove &&
      isMoveComplete(lastMove) &&
      !isMoveCorrect(lastMove)
    ) {
      // disable flipping
      setIsFlippingDisabled(true);

      setTimeout(() => {
        // revert move
        if (lastMove?.pickedCard1 !== undefined)
          flipCell(lastMove.pickedCard1, true);
        if (lastMove?.pickedCard2 !== undefined)
          flipCell(lastMove.pickedCard2, true);
        // re-enable flipping
        setIsFlippingDisabled(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
    /**
     * while excluding deps is generally not a good practice, in this particular case
     * we can safely do so, because this hook only depends on moves and isGameStarted.
     * In fact, values inside cells never change, and the same goes for flipCell.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, isGameStarted]);

  const onClickCard = useCallback(
    (value: number) => {
      // this sets the card's value inside a move
      pickCard(value);
      // this flips the card on the board
      flipCell(value);
    },
    [pickCard, flipCell]
  );

  const canFlipCards = isGameStarted && !isFlippingDisabled;
  const shouldHideTimer = isGameStarted || error;

  const hasCompletedGame = isGameComplete();
  if (hasCompletedGame) {
    return (
      <MainLayout>
        <h1 className="text-3xl uppercase mb-8">Congratulations!</h1>
        <div className="flex flex-col justify-center items-center gap-8">
          <Image
            src="https://placekitten.com/g/300/300"
            alt="success"
            width={300}
            height={300}
            className="rounded-xl"
          />
          <h2 className="text-4xl text-center">
            You won the game in&nbsp;
            <span className="font-bold text-5xl">{moves.length} moves!</span>
          </h2>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => alert("well, this is not implemented...")}
          >
            Tell a friend!
          </button>
          <Link href="/" className="btn btn-md text-xl btn-primary">
            &#x2190; Back to Home
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className={`font-mono text-center ${
          shouldHideTimer ? "invisible" : ""
        }`}
      >
        <p className="text-xl uppercase">Get Ready!</p>
        <span className="countdown text-6xl">
          {/*
            I added an explicit cast because TypeScript is not happy with --value
            TODO: find a cleaner solution
          */}
          <span style={{ "--value": timeLeftToStart } as CSSProperties} />
        </span>
      </div>

      <div
        className={`${
          shouldShowWrongMoveError ? "animate-pulse" : "invisible"
        }`}
      >
        <p className="uppercase text-3xl">Wrong! Try again</p>
      </div>

      {error && (
        <div className="sm:container alert alert-error shadow-lg">
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
              key={i}
              disabled={!canFlipCards}
              onClick={() => onClickCard(i)}
            >
              <GameCard
                value={cell.value}
                flipped={cell.flipped}
                disabled={isFlippingDisabled}
              />
            </button>
          );
        })}
      </div>
      <Link href="/" className="btn btn-lg btn-outline text-xl my-8">
        &#x2190; Back
      </Link>
    </MainLayout>
  );
}
