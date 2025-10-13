import type { Metadata } from "next";
import "./globals.css";
import { Header, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Codiving's 개발 블로그",
  description:
    "Codiving's 개발 블로그입니다. React, NextJS, TypeScript, JavaScript, Electron 등 여러 언어와 프레임워크를 공유합니다.",
};

const items: TreeItem[] = [
  {
    label: "프로그래밍",
    children: [
      {
        label: "GraphQL",
        children: [
          {
            open: true,
            label: "GraphQL에서 Date 타입 다루기",
            path: "프로그래밍/GraphQL/GraphQL에서 Date 타입 다루기",
          },
        ],
        open: true,
      },
      {
        label: "Jest",
        children: [
          {
            open: true,
            label: "Jest에서 localStorage 사용하기",
            path: "프로그래밍/Jest/Jest에서 localStorage 사용하기",
          },
        ],
        open: true,
      },
      {
        label: "MinIO",
        children: [
          {
            open: true,
            label: "MinIO 버킷 내 특정 객체 Public으로 설정하기",
            path: "프로그래밍/MinIO/MinIO 버킷 내 특정 객체 Public으로 설정하기",
          },
        ],
        open: true,
      },
      {
        label: "Next",
        children: [
          {
            open: true,
            label: "Next.js에서 redirect 설정하기",
            path: "프로그래밍/Next/Next.js에서 redirect 설정하기",
          },
          {
            open: true,
            label: "Next.js에서 환경변수 다루기",
            path: "프로그래밍/Next/Next.js에서 환경변수 다루기",
          },
        ],
        open: true,
      },
    ],
    open: true,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={"flex h-screen flex-col"}>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar items={items} />
          {children}
        </div>
      </body>
    </html>
  );
}
