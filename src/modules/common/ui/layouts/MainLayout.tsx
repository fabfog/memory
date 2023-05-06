import { Barlow } from "next/font/google";
import { FC, PropsWithChildren } from "react";
const font = Barlow({ weight: "400", subsets: ["latin"] });

export interface MainLayoutProps {}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-8 ${font.className}`}
    >
      {children}
      <footer>Fabio Fognani - 2023</footer>
    </main>
  );
};
