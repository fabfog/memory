import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import Link from "next/link";

import { GameCard } from "@/modules/game/ui/GameCard";

export default function Home() {
  return (
    <MainLayout>
      <div className="text-4xl mb-8 uppercase">Kitten Memory</div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 max-w-fit mx-auto mb-8">
          {new Array(4).fill(0).map((_, i) => (
            <GameCard flipped={i % 3 === 0} value={i} key={i} />
          ))}
        </div>

        <Link href="/game" className="btn btn-lg text-lg btn-primary">
          &#9658; Play New Game
        </Link>
        <Link href="/options" className="btn btn-md text-lg btn-secondary mx-2">
          Options
        </Link>
      </div>
    </MainLayout>
  );
}
