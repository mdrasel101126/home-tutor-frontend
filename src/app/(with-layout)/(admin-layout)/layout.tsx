"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { role } = getUserInfo() as any;

  useEffect(() => {
    if (!userLoggedIn || role == "tutor" || role == "user") {
      router.push("/home");
    }
    setIsLoading(true);
  }, [router, isLoading, role, userLoggedIn]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return (
    <Layout hasSider style={{ backgroundColor: "white" }}>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
