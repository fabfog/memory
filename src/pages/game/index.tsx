import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  DEFAULT_BOARD_HEIGHT,
  DEFAULT_BOARD_WIDTH,
} from "@/modules/game/constants";
import { getSavedOptions } from "@/modules/game/utils";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Game() {
  const { boardWidth, boardHeight } = getSavedOptions();
  const width = +(boardWidth ?? DEFAULT_BOARD_WIDTH);
  const height = +(boardHeight ?? DEFAULT_BOARD_HEIGHT);

  const urlToRedirectTo = `/game/${width}/${height}`;

  const router = useRouter();

  useEffect(() => {
    router.replace(urlToRedirectTo);
  }, [router, urlToRedirectTo]);

  return null;
}
