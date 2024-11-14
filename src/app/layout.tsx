import "@/app/globals.css";
import { Header } from "@/components/ui/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ポケット格安引越し検索",
  description: "引越し業者の見積もりを簡単に比較検索",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="flex flex-col">
          <Header />
          <main>
            {" "}
            {/* ヘッダーの高さ分のパディング */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
