"use client";
import React from "react";
import { Layout } from "antd";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { usePathname } from "next/navigation";

const { Content } = Layout;

const App = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log("pathnaem", pathname);
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <div
          className="site-layout-content"
          style={{
            minHeight: "100vh",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </Content>
      {!pathname.startsWith("/dashboard") && <Footer />}
    </Layout>
  );
};

export default App;
