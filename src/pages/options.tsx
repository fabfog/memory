import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import {
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
} from "@/modules/game/constants";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import {
  GameOptionsForm,
  useGameOptionsForm,
} from "@/modules/game/hooks/useGameOptionsForm";
import { TextInput } from "@/modules/common/ui/form/TextInput";
import {
  areBoardDimensionsValid,
  getSavedOptions,
  saveOptions,
} from "@/modules/game/utils";

export default function Options() {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useGameOptionsForm();

  // load previously saved values from localStorage
  useEffect(() => {
    const { boardWidth, boardHeight } = getSavedOptions();
    if (boardWidth) setValue("boardWidth", +boardWidth);
    if (boardHeight) setValue("boardHeight", +boardHeight);
  }, [setValue]);

  const router = useRouter();

  const onSubmit = useCallback(
    (options: GameOptionsForm) => {
      saveOptions(options);
      router.push("/");
    },
    [router]
  );

  const [boardWidth, boardHeight] = watch(["boardWidth", "boardHeight"]);

  const shouldShowDimensionsError = !areBoardDimensionsValid(
    boardWidth,
    boardHeight
  );

  return (
    <MainLayout>
      <h1 className="text-3xl uppercase mb-8">Options</h1>
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">Grid dimensions</p>
          <TextInput
            name="boardWidth"
            label="width"
            control={control}
            inputProps={{
              required: true,
              min: MIN_BOARD_WIDTH,
              max: MAX_BOARD_WIDTH,
              type: "number",
            }}
          />
          <TextInput
            name="boardHeight"
            label="height"
            control={control}
            inputProps={{
              min: MIN_BOARD_HEIGHT,
              max: MAX_BOARD_HEIGHT,
              required: true,
              type: "number",
            }}
          />

          <div
            className={`sm:container alert alert-error shadow-lg ${
              shouldShowDimensionsError ? "" : "invisible"
            }`}
          >
            <span className="text-lg">
              Board width and height cannot be both odd
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/" className="btn btn-lg btn-outline text-md btn-accent">
            &#x2190; Back
          </Link>
          <button
            type="submit"
            disabled={!isValid}
            className={`btn btn-lg text-md btn-primary ${
              isValid ? "" : "btn-disabled"
            }`}
          >
            &#x2713; Save
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
