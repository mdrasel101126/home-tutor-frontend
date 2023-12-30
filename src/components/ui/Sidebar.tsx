"use client";

import { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import {
  BookOutlined,
  ScheduleOutlined,
  RedoOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;

  const items = () => {
    const sidebarItems: MenuProps["items"] = [
      {
        label: "Users",
        key: "user",
        icon: <UserOutlined />,
        children: [
          {
            label: (
              <Link href="/dashboard/all-user">
                <h4>All Users</h4>
              </Link>
            ),
            key: `allUser`,
          },
          {
            label: (
              <Link href="/dashboard/all-tutor">
                <h4>All Tutor</h4>
              </Link>
            ),
            key: `allTutor`,
          },
        ],
      },
      {
        label: <Link href="/dashboard/all-bookings">All bookings</Link>,
        icon: <ScheduleOutlined />,
        key: "booking",
      },
    ];

    const tutorSidebarItems: MenuProps["items"] = [
      ...sidebarItems,
      {
        label: (
          <Link href="/dashboard/booking-request">Requested bookings</Link>
        ),
        icon: <BookOutlined />,
        key: "bookingRequest",
      },
    ];
    if (role == "admin_user") {
      return sidebarItems;
    } else {
      return tutorSidebarItems;
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
    >
      <div
        style={{
          color: "#3b82f6",
          fontSize: "1rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        ADMIN
      </div>
      <Menu
        style={{ backgroundColor: "white" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items()}
      />
    </Sider>
  );
};

export default SideBar;
