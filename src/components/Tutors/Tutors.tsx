"use client";
import React from "react";
import { Button, Card, Col, Empty, Row, Spin } from "antd";
import Image from "next/image";
import maleTeacher from "../../assets/maleTeacher.png";
import femaleTeacher from "../../assets/femaleTeacher.png";
import { useAllTutorsByUserQuery } from "@/redux/api/tutorApi";
import Link from "next/link";
import { addToLocalStorage } from "@/services/cart.service";

const AllTutors = () => {
  const { data, isLoading } = useAllTutorsByUserQuery({ page: 1, limit: 10 });

  return (
    <>
      {isLoading ? (
        <>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{
              margin: "0 auto",
              padding: "50px",
            }}
          >
            <Spin tip="Loading" size="large"></Spin>
          </Empty>
        </>
      ) : (
        <Row
          justify="center"
          style={{ padding: "20px 30px 20px 20px" }}
          align="middle"
          gutter={30}
        >
          {data?.data?.data.length !== 0 ? (
            data?.data?.data?.map((singleData: any, index: number) => (
              <Col key={index} xs={15} sm={10} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ width: "100%", margin: "0 auto 15px auto" }}
                  cover={
                    <Image
                      alt="tutorImage"
                      src={
                        singleData.gender == "male"
                          ? maleTeacher
                          : femaleTeacher
                      }
                      width={200}
                      height={200}
                    />
                  }
                >
                  <h2
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {singleData.fullName}
                  </h2>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Institution:</span>{" "}
                    {singleData.institution}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Medium:</span>{" "}
                    {singleData.medium}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Preferred Subject:
                    </span>{" "}
                    {singleData.preferredSubject}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Preferred Class:</span>{" "}
                    {singleData.preferredClass}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Expected Salary:</span>{" "}
                    {singleData.expectedMinSalary}
                  </p>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Button
                        style={{
                          backgroundColor: "#c3ffbd",
                          color: "#07b318",
                          width: "100%",
                        }}
                        onClick={() =>
                          addToLocalStorage(
                            singleData._id,
                            singleData.fullName,
                            singleData.medium,
                            singleData.preferredClass,
                            singleData.expectedMinSalary
                          )
                        }
                      >
                        <h5>Add to cart</h5>
                      </Button>
                    </Col>{" "}
                    <Col span={11}>
                      <Link href={`/tutor/${singleData._id}`}>
                        <Button
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </Col>
                  </Row>
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
        <Link href={`/all-tutor`}>
          <Button
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "bold",
              width: "200px",
            }}
          >
            All Tutors
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AllTutors;
