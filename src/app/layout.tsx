import '@ant-design/v5-patch-for-react-19';
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
        <head></head>
        <body>
          <AntdRegistry>
            <AppLayout>{children}</AppLayout>
          </AntdRegistry>
        </body>
      </html>
    </MyProvider>
  );
}
