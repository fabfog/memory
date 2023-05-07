import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, useCallback, useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { MainLayout } from "@/modules/common/ui/layouts/MainLayout";
import { useGameOptionsForm } from "@/modules/game/hooks/useGameOptionsForm";
import {
  formatDimensionsOptionLabel,
  getSavedOptions,
  saveOptions,
} from "@/modules/game/utils";
import { PawIcon } from "@/modules/common/ui/icons/PawIcon";
import { allowedGridDimensionsOptions } from "@/modules/game/constants";

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
    setValue,
    watch,
    formState: { isValid },
  } = useGameOptionsForm({ defaultValues: getSavedOptions() });

  const formValues = watch();
  const router = useRouter();

  const onSelectLanguage: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      const newLanguage = e.target.value;
      const { pathname, query } = router;
      router.push({ pathname, query }, router.asPath, { locale: newLanguage });
    },
    [router]
  );

  // set width and height into form, as separate values
  const onChangeDimensions = useCallback(
    (optionIndex: number) => {
      const { h, w } = allowedGridDimensionsOptions[optionIndex];
      setValue("boardWidth", w);
      setValue("boardHeight", h);
    },
    [setValue]
  );

  // get dimensions option matching form values
  const selectedDimensionsOptionIndex = useMemo(() => {
    const { boardWidth, boardHeight } = formValues;
    return allowedGridDimensionsOptions.findIndex(
      ({ w, h }) =>
        formatDimensionsOptionLabel(w, h) ===
        formatDimensionsOptionLabel(boardWidth, boardHeight)
    );
  }, [formValues]);

  // If saved dimensions don't exist (anymore), pick the default
  useEffect(() => {
    if (selectedDimensionsOptionIndex === -1) {
      onChangeDimensions(
        allowedGridDimensionsOptions.findIndex((o) => o.isDefault)
      );
    }
  }, [selectedDimensionsOptionIndex, onChangeDimensions]);

  // auto-submit edited options
  useEffect(() => {
    saveOptions(formValues);
  }, [formValues, isValid]);

  return (
    <MainLayout>
      <h1 className="text-xl uppercase mb-8 flex items-center">
        <PawIcon className="fill-slate-300 mr-3 w-7 h-7" /> {t("options")}
      </h1>
      <form className="h-full flex flex-col gap-8">
        <div className="form-control text-md mx-auto">
          <label className="input-group">
            <span className="uppercase">{t("language")}</span>
            <select
              className="select select-lg select-primary text-md"
              onChange={onSelectLanguage}
              value={i18n.language}
            >
              <option value="it">🇮🇹 ITA</option>
              <option value="en">🇬🇧 ENG</option>
              <option value="es">🇪🇸 ESP</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="form-control text-md">
            <label className="input-group">
              <span className="uppercase truncate">{t("gridDimensions")}</span>
              <select
                value={selectedDimensionsOptionIndex}
                className="select select-lg select-primary text-md"
                onChange={(e) => onChangeDimensions(+e.target.value)}
              >
                {allowedGridDimensionsOptions.map(({ w, h }, i) => (
                  <option value={i} key={i}>
                    {formatDimensionsOptionLabel(w, h)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/" className="btn btn-lg btn-outline text-md btn-accent">
            &#x2190; {t("backToHome")}
          </Link>
        </div>
      </form>
    </MainLayout>
  );
}
