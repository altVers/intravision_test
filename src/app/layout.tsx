import React from "react";
import "../assets/styles/styles.css";
import { AppLayout } from "@/components/AppLayout/AppLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
