import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "next-i18next";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { GameMove } from "@/modules/game/store";

export interface SuccessProps {
  moves: GameMove[];
}

export default function Success({ moves }: SuccessProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const onClickPlayAgain = useCallback(() => {
    router.reload();
  }, [router]);

  return (
    <MainLayout>
      <h1 className="text-xl uppercase mb-8 animate-bounce">
        {t("congratulations")}
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 mb-8">
        <Image
          src="https://placekitten.com/g/300/300?image=15"
          alt="success"
          width={300}
          height={300}
          className="rounded-xl w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"
        />
        <h2 className="text-xl text-center flex flex-col gap-2 items-center">
          <span>{t("successMessageFirstLine")}</span>
          <span className="font-bold text-6xl">
            {t("successMessageSecondLine", { movesCount: moves.length })}
          </span>
        </h2>
        <button
          className="btn btn-secondary btn-lg text-md"
          onClick={() => alert("well, this is not implemented...")}
        >
          &#10084; {t("shareCTA")}
        </button>
        <button
          onClick={onClickPlayAgain}
          className="btn btn-primary btn-lg text-md"
        >
          &#8634; {t("playAgain")}
        </button>
        <Link href="/" className="btn btn-md text-md btn-accent">
          &#x2190; {t("backToHome")}
        </Link>
      </div>
    </MainLayout>
  );
}
