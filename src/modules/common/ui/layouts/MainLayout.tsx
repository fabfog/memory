import { Shadows_Into_Light } from "next/font/google";
import { FC, PropsWithChildren } from "react";
const font = Shadows_Into_Light({ weight: "400", subsets: ["latin"] });

export interface MainLayoutProps {}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 ${font.className}`}
    >
      {children}
      <footer className="text-md mt-2">Fabio Fognani - 2023</footer>
    </main>
  );
};
