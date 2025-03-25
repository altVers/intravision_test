"use client";

import React from "react";

import { Layout } from "antd";
import { Navigation } from "@/components/Navigation/Navigation";
import logo from "../../assets/img/logo.png";
import searchSvg from "../../assets/img/searchSvg.svg";


import Image from "next/image";
import Link from "next/link";

const { Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: 72,
  padding: 16,
  backgroundColor: "#D1E0ED",
};

const contentStyle: React.CSSProperties = {
  padding: "38px 5px",
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

const searchFieldStyles: React.CSSProperties = {
  width: "100%",
  height: 40,
  padding: 14,
  borderRadius: 50,
  border: "1px solid #42AAFF",
};

const searchLabelStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  right: 13,
  transform: "translateY(-50%)",
  width: 20,
  height: 20,
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
        <header style={headerStyle}>
          <form style={{width: 680, height: 40}}>
            <div style={{position: "relative"}}>
              <input style={searchFieldStyles} id="search" />
              <label htmlFor="search" style={searchLabelStyles}>
                <Image src={searchSvg} alt="Иконка лупы" width={20} height={20}/>
              </label>
            </div>
          </form>
        </header>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
    </Layout>
  );
}
