"use client";
import { removeFromLocalStorage } from "@/services/cart.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import { Button, Card, Col, Empty, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <Card
      bodyStyle={{ padding: "20px", overflow: "hidden", minHeight: "100vh" }}
      style={{ margin: "0 30px" }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "10px 0",
          backgroundColor: "white",
        }}
      >
        My Cart
      </h4>
      <Row
        justify="space-evenly"
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "20px",
        }}
        align="middle"
        gutter={[10, 10]}
      >
        {data?.length ? (
          data?.map((singleCartTutor: any, index: number) => (
            <Card
              key={index}
              hoverable
              style={{
                width: 280,
                margin: "0 5px",
                backgroundColor: "#f3f4de",
              }}
            >
              <p style={{ margin: "10px 0" }}>
                <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                {singleCartTutor.name}
              </p>
              <p style={{ margin: "10px 0" }}>
                <span style={{ fontWeight: "bold" }}>Medium:</span>{" "}
                {singleCartTutor.medium}
              </p>
              <p style={{ margin: "10px 0" }}>
                <span style={{ fontWeight: "bold" }}>Preferred Class:</span>{" "}
                {singleCartTutor.class}
              </p>
              <p style={{ margin: "10px 0" }}>
                <span style={{ fontWeight: "bold" }}>Salary:</span>{" "}
                {singleCartTutor.salary}
              </p>
              <Row justify="space-between">
                <Col span={11}>
                  <Button
                    onClick={() =>
                      removeFromCart(singleCartTutor.id, singleCartTutor.name)
                    }
                    style={{
                      backgroundColor: "#ffbdbd",
                      color: "#b30707",
                      fontWeight: "bold",
                      width: "100%",
                      padding: "0",
                    }}
                  >
                    <h5>Remove</h5>
                  </Button>
                </Col>
                <Col span={12}>
                  <Link href={`/tutor/${singleCartTutor.id}`}>
                    <Button
                      style={{
                        backgroundColor: "#c3ffbd",
                        color: "#07b318",
                        fontWeight: "bold",
                        width: "100%",
                        padding: "0",
                      }}
                    >
                      Details
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "50px auto" }}
          />
        )}
      </Row>
    </Card>
  );
};

export default Cart;
