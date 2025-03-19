"use client";

import React from "react";
import { Layout, Input } from "antd";
import "../assets/styles/styles.css";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const headerStyle: React.CSSProperties = {
  height: 64,
  padding: 16,
  lineHeight: "32px",
  backgroundColor: "#D1E0ED",
};

const contentStyle: React.CSSProperties = {
  padding: 16,
  minHeight: 120,
  color: "#fff",
  backgroundColor: "#FFFFFF",
};

const siderStyle: React.CSSProperties = {
  padding: 16,
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#002137",
};

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={layoutStyle}>
          <Sider width="8%" style={siderStyle}>
            Sider
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <Search
                placeholder="Найти..."
                allowClear
                style={{ width: 500 }}
              />
            </Header>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
