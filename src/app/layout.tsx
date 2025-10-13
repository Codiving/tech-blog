import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codiving's 개발 블로그",
  description:
    "Codiving's 개발 블로그입니다. React, NextJS, TypeScript, JavaScript, Electron 등 여러 언어와 프레임워크를 공유합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={"flex h-screen flex-col"}>{children}</body>
    </html>
  );
}
