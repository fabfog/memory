import Link from "next/link";
import { useState } from "react";
import { useInterval } from "react-use";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { GameCard } from "@/modules/game/ui/GameCard";
import { PawIcon } from "@/modules/common/ui/icons/PawIcon";
import { GetStaticProps } from "next";

const displayedCards = 4;

// the order in which the cards are flipped
// simulates a "clockwise" flipping animation
const cardsFlipIndexSequence = [0, 1, 3, 2];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default function Home() {
  const { t } = useTranslation();

  const [flipIndex, setFlipIndex] = useState(0);
  useInterval(() => {
    setFlipIndex((i) => (i + 1) % displayedCards);
  }, 1000);

  return (
    <MainLayout>
      <div className="text-2xl mt-8 uppercase text-center mx-auto">
        {t("appName")}
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
          &#9658; {t("playNewGame")}
        </Link>
        <Link href="/options" className="btn btn-md text-lg btn-secondary mx-2">
          <PawIcon className="mr-3" />
          {t("options")}
        </Link>
      </div>
    </MainLayout>
  );
}
