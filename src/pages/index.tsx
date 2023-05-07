import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import Link from "next/link";

import { GameCard } from "@/modules/game/ui/GameCard";
import { PawIcon } from "@/modules/common/ui/icons/PawIcon";
import { useState } from "react";
import { useInterval } from "react-use";

const displayedCards = 4;

// the order in which the cards are flipped
// simulates a "clockwise" flipping animation
const cardsFlipIndexSequence = [0, 1, 3, 2];

export default function Home() {
  const [flipIndex, setFlipIndex] = useState(0);
  useInterval(() => {
    setFlipIndex((i) => (i + 1) % displayedCards);
  }, 1000);

  return (
    <MainLayout>
      <div className="text-2xl mt-8 uppercase animate-bounce text-center mx-auto">
        Kitten Memory
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 max-w-fit mx-auto mb-8">
          {new Array(displayedCards).fill(0).map((_, i) => (
            <GameCard
              key={i}
              className="w-24 h-36 sm:w-32 sm:h-48"
              flipped={i !== cardsFlipIndexSequence[flipIndex]}
              value={i}
            />
          ))}
        </div>

        <Link href="/game" className="btn btn-lg text-lg btn-primary">
          &#9658; Play New Game
        </Link>
        <Link
          href="/options"
          className="btn btn-md text-lg btn-secondary mx-2 text-white"
        >
          <PawIcon className="fill-white mr-3" />
          Options
        </Link>
      </div>
    </MainLayout>
  );
}
