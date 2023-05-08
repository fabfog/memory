import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useGameStore } from "@/modules/game/store";
import { GameCard } from "@/modules/game/ui/GameCard";
import { useCountdown } from "@/modules/common/hooks/useCountdown";
import { areBoardDimensionsValid } from "@/modules/game/utils";
import Success from "@/modules/game/containers/Success";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default function Game() {
  const router = useRouter();
  const { width, height } = router.query;
  const { t } = useTranslation();

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
    flipCard,
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
          flipCard(lastMove.pickedCard1, true);
        if (lastMove?.pickedCard2 !== undefined)
          flipCard(lastMove.pickedCard2, true);
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
     * In fact, values inside cells never change, and the same goes for flipCard.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, isGameStarted]);

  const canFlipCards = isGameStarted && !isFlippingDisabled;
  const shouldHideTimer = isGameStarted || error;

  if (isGameComplete()) {
    return <Success moves={moves} />;
  }

  return (
    <MainLayout>
      <div className={`text-center mb-4 ${shouldHideTimer ? "invisible" : ""}`}>
        <p className="text-xl uppercase">{t("getReady")}</p>
        <span className="countdown text-6xl">
          <span style={{ "--value": timeLeftToStart }} />
        </span>
      </div>

      <div className={`modal ${shouldShowWrongMoveError ? "modal-open" : ""}`}>
        <p className="uppercase animate-bounce text-xl my-8 mx-auto text-center">
          {t("wrongMoveErrorMessage")}
        </p>
      </div>

      {error && (
        <div className="sm:container alert alert-error shadow-lg">
          <span className="text-lg">{t("boardDimensionsErrorMessage")}</span>
        </div>
      )}
      <div
        style={{
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
              onClick={() => cell.flipped && pickCard(i)}
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
      <Link
        href="/"
        className="btn btn-sm btn-outline btn-secondary text-sm mt-6 mb-4"
      >
        {t("exitGame")}
      </Link>
    </MainLayout>
  );
}
