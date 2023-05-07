import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { GameMove } from "@/modules/game/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

export interface SuccessProps {
  moves: GameMove[];
}

export function Success({ moves }: SuccessProps) {
  const router = useRouter();

  const onClickPlayAgain = useCallback(() => {
    router.reload();
  }, [router]);

  return (
    <MainLayout>
      <h1 className="text-xl uppercase mb-8 animate-bounce">
        Congratulations!
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 mb-8">
        <Image
          src="https://placekitten.com/g/300/300?image=15"
          alt="success"
          width={300}
          height={300}
          className="rounded-xl"
        />
        <h2 className="text-xl text-center flex flex-col gap-2 items-center">
          <span>You won the game in</span>
          <span className="font-bold text-6xl">{moves.length} moves!</span>
        </h2>
        <button
          className="btn btn-secondary btn-lg text-md"
          onClick={() => alert("well, this is not implemented...")}
        >
          &#10084; Tell a friend!
        </button>
        <button
          onClick={onClickPlayAgain}
          className="btn btn-primary btn-lg text-md"
        >
          &#8634; Play again
        </button>
        <Link href="/" className="btn btn-md text-md btn-accent">
          &#x2190; Back to Home
        </Link>
      </div>
    </MainLayout>
  );
}
