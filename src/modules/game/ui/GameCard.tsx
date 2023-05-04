import Image from "next/image";
import { FC } from "react";

import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
} from "@/modules/game/constants";

export interface GameCardProps {
  value: number;
}

export const GameCard: FC<GameCardProps> = ({ value }) => {
  return (
    <Image
      className="rounded-xl"
      src={`https://placekitten.com/${DEFAULT_CARD_WIDTH}/${DEFAULT_CARD_HEIGHT}?image=${value}`}
      width={DEFAULT_CARD_WIDTH}
      height={DEFAULT_CARD_HEIGHT}
      alt="kitten"
    />
  );
};
