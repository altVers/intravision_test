import React from "react";
import { AppLayout } from "@/components/AppLayout/AppLayout";
import { MyProvider } from "@/components/Provider/Provider";
import "../assets/styles/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyProvider>
      <html lang="ru">
        <body>
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </MyProvider>
  );
}
