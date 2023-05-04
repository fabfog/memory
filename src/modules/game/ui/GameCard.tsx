import Image from "next/image";
import { FC } from "react";

import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
} from "@/modules/game/constants";

export interface GameCardProps {
  value: number;
  flipped: boolean;
}

export const GameCard: FC<GameCardProps> = ({ value, flipped }) => {
  return (
    <div
      className="rounded-xl bg-gradient-to-b from-primary to-slate-400"
      style={{
        width: DEFAULT_CARD_WIDTH,
        height: DEFAULT_CARD_HEIGHT,
        backgroundImage: flipped
          ? undefined
          : `url(https://placekitten.com/${DEFAULT_CARD_WIDTH}/${DEFAULT_CARD_HEIGHT}?image=${value})`,
      }}
    />
  );
};
