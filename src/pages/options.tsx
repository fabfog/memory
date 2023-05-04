import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
import { getValidBoardHeight, getValidBoardWidth } from "@/modules/game/utils";

export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(
      getValidBoardWidth(+(localStorage.getItem(LS_OPTIONS_WIDTH_KEY) ?? 0))
    );
    setHeight(
      getValidBoardHeight(+(localStorage.getItem(LS_OPTIONS_HEIGHT_KEY) ?? 0))
    );
  }, []);

  const router = useRouter();

  // Very naive handling of options, but for this simple app it will be enough
  const onSubmit = useCallback(() => {
    localStorage.setItem(
      LS_OPTIONS_WIDTH_KEY,
      getValidBoardWidth(width).toString()
    );
    localStorage.setItem(
      LS_OPTIONS_HEIGHT_KEY,
      getValidBoardHeight(height).toString()
    );
    router.push("/");
  }, [width, height, router]);

  return (
    <MainLayout>
      <h1 className="text-3xl uppercase mb-8">Options</h1>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-xl">Grid dimensions</p>
        <div className="form-control">
          <label className="input-group">
            <span className="uppercase">width</span>
            <input
              type="number"
              value={width}
              className="input input-bordered input-lg"
              min={MIN_BOARD_WIDTH}
              max={MAX_BOARD_WIDTH}
              onChange={(e) => setWidth(+e.target.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span className="uppercase">height</span>
            <input
              type="number"
              value={height}
              className="input input-bordered input-lg"
              min={MIN_BOARD_HEIGHT}
              max={MAX_BOARD_HEIGHT}
              onChange={(e) => setHeight(+e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn btn-lg btn-outline text-xl btn-accent">
          &#x2190; Back
        </Link>
        <button onClick={onSubmit} className="btn btn-lg text-xl btn-primary">
          &#x2713; Save
        </button>
      </div>
    </MainLayout>
  );
}
