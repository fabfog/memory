import { FC } from "react";

import {
  DEFAULT_CARD_HEIGHT,
  DEFAULT_CARD_WIDTH,
} from "@/modules/game/constants";
import { PawIcon } from "@/modules/common/ui/icons/PawIcon";

export interface GameCardProps {
  value: number;
  flipped: boolean;
  disabled?: boolean;
  className?: string;
}

export const GameCard: FC<GameCardProps> = ({
  value,
  flipped,
  className,
  disabled,
}) => {
  return (
    <div
      className={`
        w-20 h-32 sm:w-24 h-36
        rounded-xl overflow-hidden bg-cover
        ${flipped ? "border-4 border-primary" : ""}
        ${disabled ? "opacity-75" : ""}
        ${className ?? ""}`}
      style={{
        backgroundImage: flipped
          ? undefined
          : `url(https://placekitten.com/${DEFAULT_CARD_WIDTH}/${DEFAULT_CARD_HEIGHT}?image=${value})`,
      }}
    >
      {flipped && (
        <div className="bg-gradient-to-br h-full from-secondary to-neutral flex justify-center items-center">
          <PawIcon className="w-10 sm:w-16 h-10 sm:h-16 fill-primary" />
        </div>
      )}
    </div>
  );
};
