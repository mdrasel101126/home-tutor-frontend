"use client";
import { useGetFeedbacksQuery } from "@/redux/api/feedbackApi";
import { isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Empty, Row, Spin } from "antd";
import Link from "next/link";
import React from "react";

const Feedback = () => {
  const { data, isLoading } = useGetFeedbacksQuery({ page: 1, limit: 12 });

  return (
    <>
      {isLoading ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{
            margin: "0 auto",
            padding: "50px",
            backgroundColor: "white",
          }}
        >
          <Spin tip="Loading" size="large"></Spin>
        </Empty>
      ) : (
        <Row
          justify="center"
          style={{
            width: "100%",
            padding: "20px",
          }}
          align="middle"
          gutter={[10, 24]}
        >
          {data?.data?.data?.length !== 0 ? (
            data?.data?.data
              ?.slice(0, 9)
              .map((singleFeedback: any, index: number) => (
                <Col key={index} sm={12} md={6} lg={4} className="gutter-row">
                  <Card
                    hoverable
                    style={{
                      width: "200px",
                      background: "white",
                      padding: "0",
                    }}
                  >
                    <h4
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {singleFeedback.name}
                    </h4>
                    <p style={{ margin: "10px 0 0 0" }}>
                      {singleFeedback.feedback}
                    </p>
                  </Card>
                </Col>
              ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ margin: "50px auto" }}
            />
          )}
        </Row>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "10px",
        }}
      >
        {isLoggedIn() && (
          <Link href={`/feedback`}>
            <Button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                fontWeight: "bold",
                width: "200px",
              }}
            >
              Give your feedback
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Feedback;
