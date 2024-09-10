import type { Metadata } from "next";
import "../../globals.css";


export const metadata: Metadata = {
  title: "Loadit",
  description: "Loadit",
};

const CommonLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-full">{children}</div>;
};

export default CommonLayout;
