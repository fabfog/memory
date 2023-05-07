import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
import { PawIcon } from "@/modules/common/ui/icons/PawIcon";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ["common"]) : {}),
    },
  };
};

export default function Options() {
  const { t, i18n } = useTranslation();

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

  const onSelectLanguage: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      const newLanguage = e.target.value;
      const { pathname, query } = router;
      router.push({ pathname, query }, router.asPath, { locale: newLanguage });
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
      <h1 className="text-xl uppercase mb-8 flex items-center">
        <PawIcon className="fill-slate-300 mr-3 w-7 h-7" /> {t("options")}
      </h1>
      <form
        className="h-full flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center mx-auto">
          <p className="text-lg mb-4">{t("language")}</p>
          <select
            onChange={onSelectLanguage}
            className="select select-primary text-sm"
            defaultValue={i18n.language}
          >
            <option value="it">🇮🇹 ITA</option>
            <option value="en">🇬🇧 ENG</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <p className="text-lg">{t("gridDimensions")}</p>
          <TextInput
            name="boardWidth"
            label={t("width")}
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
            label={t("height")}
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
            <span className="text-lg">{t("bothOddErrorMessage")}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/" className="btn btn-lg btn-outline text-md btn-accent">
            &#x2190; {t("backToHome")}
          </Link>
          <button
            type="submit"
            disabled={!isValid}
            className={`btn btn-lg text-md btn-primary ${
              isValid ? "" : "btn-disabled"
            }`}
          >
            &#x2713; {t("save")}
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
