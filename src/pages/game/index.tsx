import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_WIDTH,
  LS_OPTIONS_HEIGHT_KEY,
  LS_OPTIONS_WIDTH_KEY,
} from "@/modules/game/constants";

export default function Game() {
  const width = +(
    localStorage.getItem(LS_OPTIONS_WIDTH_KEY) ?? DEFAULT_BOARD_WIDTH
  );
  const height = +(
    localStorage.getItem(LS_OPTIONS_HEIGHT_KEY) ?? DEFAULT_BOARD_HEIGHT
  );

  const urlToRedirectTo = `/game/${width}/${height}`;

  const router = useRouter();

  useEffect(() => {
    router.replace(urlToRedirectTo);
  }, [router, urlToRedirectTo]);

  return null;
}
