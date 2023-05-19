import { ReactNode } from "react";

import { AppBarComponent } from "@/components/appbar/AppBarComponent";

type LayoutProps = {
  home?: boolean;
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBarComponent />
      <main>{children}</main>
    </>
  );
}
