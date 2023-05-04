import {
  LS_OPTIONS_HEIGHT_KEY,
  LS_OPTIONS_WIDTH_KEY,
} from "@/modules/game/constants";
import { getValidBoardHeight, getValidBoardWidth } from "@/modules/game/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Game() {
  const width = getValidBoardWidth(
    +(localStorage.getItem(LS_OPTIONS_WIDTH_KEY) ?? 0)
  );
  const height = getValidBoardHeight(
    +(localStorage.getItem(LS_OPTIONS_HEIGHT_KEY) ?? 0)
  );

  const urlToRedirectTo = `/game/${width}/${height}`;

  const router = useRouter();

  useEffect(() => {
    router.replace(urlToRedirectTo);
  }, [router, urlToRedirectTo]);

  return null;
}
