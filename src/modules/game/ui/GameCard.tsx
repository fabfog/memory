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
        w-16 h-24 sm:w-24 sm:h-36
        rounded-xl overflow-hidden bg-cover
        ${flipped ? "border-4 border-slate-500" : ""}
        ${disabled ? "opacity-75" : ""}
        ${className ?? ""}`}
      style={{
        backgroundImage: flipped
          ? undefined
          : `url(https://placekitten.com/${DEFAULT_CARD_WIDTH}/${DEFAULT_CARD_HEIGHT}?image=${value})`,
      }}
    >
      {flipped && (
        <div className="bg-gradient-to-b h-full from-primary to-slate-800 flex justify-center items-center">
          <PawIcon className="w-16 h-16 fill-slate-400" />
        </div>
      )}
    </div>
  );
};
