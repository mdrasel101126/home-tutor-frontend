"use client";
import React from "react";
import { Layout } from "antd";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const { Content } = Layout;

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <div
          className="site-layout-content"
          style={{
            minHeight: "100vh",
            maxWidth:"1400px",
            margin:"0 auto"
          }}
        >
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;
