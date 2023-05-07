import { UseFormProps, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_WIDTH,
  MAX_BOARD_HEIGHT,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MIN_BOARD_WIDTH,
} from "../constants";
import { areBoardDimensionsValid } from "../utils";

export interface GameOptionsForm {
  boardWidth: number;
  boardHeight: number;
}

export const gameOptionsFormSchema = yup.object({
  boardWidth: yup
    .number()
    .required()
    .min(MIN_BOARD_WIDTH)
    .max(MAX_BOARD_WIDTH)
    .test({
      test: function (boardWidth) {
        const { boardHeight } = this.parent;
        return areBoardDimensionsValid(boardWidth, boardHeight);
      },
    }),
  boardHeight: yup
    .number()
    .required()
    .min(MIN_BOARD_HEIGHT)
    .max(MAX_BOARD_HEIGHT)
    .test({
      test: function (boardHeight) {
        const { boardWidth } = this.parent;
        return areBoardDimensionsValid(boardWidth, boardHeight);
      },
    }),
});

export const useGameOptionsForm = (options?: UseFormProps<GameOptionsForm>) => {
  const { defaultValues, ...rest } = options ?? {};
  return useForm<GameOptionsForm>({
    defaultValues: {
      boardWidth: DEFAULT_BOARD_WIDTH,
      boardHeight: DEFAULT_BOARD_HEIGHT,
      ...defaultValues,
    },
    resolver: yupResolver(gameOptionsFormSchema),
    ...rest,
  });
};
