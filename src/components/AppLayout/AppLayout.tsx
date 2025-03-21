"use client";

import React from "react";
import { Layout, Input } from "antd";
import { Navigation } from "@/components/Navigation/Navigation";
import Image from "next/image";
import logo from "../../assets/img/logo.png";
import Link from "next/link";

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
  backgroundColor: "#FFFFFF",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#002137",
};

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

const logoStyle: React.CSSProperties = {
  width: 52,
  height: "auto",
  padding: "16px 0",
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <Layout style={layoutStyle}>
        <Sider width={100} style={siderStyle}>
          <Link href={"/"}>
            <Image priority src={logo} alt="logo" style={logoStyle} />
          </Link>
          <Navigation />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Search placeholder="Найти..." allowClear style={{ width: 500 }} />
          </Header>
          <Content style={contentStyle}>{children}</Content>
        </Layout>
      </Layout>
  );
}
