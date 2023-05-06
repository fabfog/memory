import { FC } from "react";

import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
} from "@/modules/game/constants";

export interface GameCardProps {
  value: number;
  flipped: boolean;
  disabled?: boolean;
}

const cardsColors = [
  "#09e708",
  "#e654ab",
  "#0000ff",
  "#d8ef5d",
  "#2bf6bc",
  "#ff0000",
];

export const GameCard: FC<GameCardProps> = ({ value, flipped, disabled }) => {
  return (
    <div
      className={`rounded-xl bg-gradient-to-b from-primary to-slate-400 w-16 h-24 sm:w-24 sm:h-36 ${
        disabled ? "opacity-75" : ""
      }`}
      data-test={value}
      style={{
        border: !flipped
          ? `4px solid ${cardsColors[value % cardsColors.length]}`
          : undefined,
        backgroundSize: "cover",
        backgroundImage: flipped
          ? undefined
          : `url(https://placekitten.com/${DEFAULT_CARD_WIDTH + value}/${
              DEFAULT_CARD_HEIGHT + value
            }?image=${value})`,
      }}
    />
  );
};
