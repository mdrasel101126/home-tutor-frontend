"use client";
import { removeFromLocalStorage } from "@/services/cart.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Card, Button, Typography, Empty, List, Space, Tag } from "antd";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
const { Title, Text } = Typography;
const Cart = () => {
  const [data, setData] = useState([]);

  const getCartData = () => {
    const cartData = getFromLocalStorage("tutor");
    setData(cartData ? JSON.parse(cartData) : []);
  };

  const removeFromCart = (id: string, name: string) => {
    removeFromLocalStorage(id, name);
    getCartData();
  };

  useEffect(() => {
    getCartData();
  }, []);
  return (
    <Card style={{ margin: "0 30px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        My Cart
      </Title>
      {data?.length ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(singleCartTutor: any) => (
            <List.Item>
              <Card
                hoverable
                style={{ backgroundColor: "#f0f2f5" }}
                actions={[
                  <Button
                    key="remove"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      removeFromCart(singleCartTutor.id, singleCartTutor.name)
                    }
                  >
                    Remove
                  </Button>,
                  <Link
                    href={`/tutor/${singleCartTutor.id}`}
                    key="details"
                  >
                    <Button
                      type="link"
                      icon={<InfoCircleOutlined />}
                    >
                      Details
                    </Button>
                  </Link>,
                ]}
              >
                <Space
                  direction="vertical"
                  size="small"
                >
                  <Text strong>{singleCartTutor.name}</Text>
                  <Text type="secondary">Medium: {singleCartTutor.medium}</Text>
                  <Text type="secondary">Class: {singleCartTutor.class}</Text>
                  <Tag color="green">Salary: {singleCartTutor.salary}</Tag>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Your cart is empty"
          style={{ margin: "50px auto" }}
        />
      )}
    </Card>
  );
};

export default Cart;
