import Link from "next/link";
import { useCallback, useEffect } from "react";

import {
  MIN_BOARD_WIDTH,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MAX_BOARD_HEIGHT,
  LS_OPTIONS_HEIGHT_KEY,
  LS_OPTIONS_WIDTH_KEY,
} from "@/modules/game/constants";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useRouter } from "next/router";
import { areBoardDimensionsValid } from "@/modules/game/utils";
import {
  GameOptionsForm,
  useGameOptionsForm,
} from "@/modules/game/hooks/useGameOptionsForm";
import { TextInput } from "@/modules/common/ui/form/TextInput";

export default function Home() {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useGameOptionsForm();

  // load previously saved values from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem(LS_OPTIONS_WIDTH_KEY);
    const savedHeight = localStorage.getItem(LS_OPTIONS_HEIGHT_KEY);
    if (savedWidth) setValue("boardWidth", +savedWidth);
    if (savedHeight) setValue("boardHeight", +savedHeight);
  }, [setValue]);

  const router = useRouter();

  const onSubmit = useCallback(
    ({ boardWidth, boardHeight }: GameOptionsForm) => {
      // save options to localStorage
      localStorage.setItem(LS_OPTIONS_WIDTH_KEY, boardWidth.toString());
      localStorage.setItem(LS_OPTIONS_HEIGHT_KEY, boardHeight.toString());
      // go back to main page
      router.push("/");
    },
    [router]
  );

  const [boardWidth, boardHeight] = watch(["boardWidth", "boardHeight"]);

  return (
    <MainLayout>
      <h1 className="text-3xl uppercase mb-8">Options</h1>
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-xl">Grid dimensions</p>
          <TextInput
            name="boardWidth"
            label="width"
            control={control}
            controllerProps={{
              rules: {
                required: true,
                min: MIN_BOARD_WIDTH,
                max: MAX_BOARD_WIDTH,
              },
            }}
          />
          <TextInput
            name="boardHeight"
            label="height"
            control={control}
            controllerProps={{
              rules: {
                required: true,
                min: MIN_BOARD_HEIGHT,
                max: MAX_BOARD_HEIGHT,
                validate: () =>
                  areBoardDimensionsValid(boardWidth, boardHeight),
              },
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/" className="btn btn-lg btn-outline text-xl btn-accent">
            &#x2190; Back
          </Link>
          <button
            type="submit"
            disabled={!isValid || !isDirty}
            className={`btn btn-lg text-xl btn-primary ${
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
