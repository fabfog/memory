import { useForm } from "react-hook-form";
import { DEFAULT_BOARD_HEIGHT, DEFAULT_BOARD_WIDTH } from "../constants";

export interface GameOptionsForm {
  boardWidth: number;
  boardHeight: number;
}

export const useGameOptionsForm = () => {
  return useForm<GameOptionsForm>({
    defaultValues: {
      boardWidth: DEFAULT_BOARD_WIDTH,
      boardHeight: DEFAULT_BOARD_HEIGHT,
    },
  });
};
