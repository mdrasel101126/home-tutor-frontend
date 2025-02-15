"use client";
import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import maleTeacher from "../../assets/maleTeacher.png";
import femaleTeacher from "../../assets/femaleTeacher.png";
import { useAllTutorsByUserQuery } from "@/redux/api/tutorApi";
import Link from "next/link";
import { addToLocalStorage } from "@/services/cart.service";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

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
            <Spin
              tip="Loading"
              size="large"
            ></Spin>
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
              <Col
                key={index}
                xs={24}
                sm={10}
                md={8}
                lg={6}
              >
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    margin: "0 auto 24px auto",
                  }}
                  cover={
                    <div
                      style={{
                        position: "relative",
                        height: 200,
                        background: "#f0f2f5",
                      }}
                    >
                      <Image
                        alt="tutorImage"
                        src={
                          singleData.gender === "male"
                            ? maleTeacher
                            : femaleTeacher
                        }
                        layout="fill"
                        style={{
                          aspectRatio: 2,
                        }}
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      key="addToCart"
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() =>
                        addToLocalStorage(
                          singleData._id,
                          singleData.fullName,
                          singleData.medium,
                          singleData.preferredClass,
                          singleData.expectedMinSalary,
                        )
                      }
                      style={{
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                      }}
                    >
                      Add to cart
                    </Button>,
                    <Link
                      href={`/tutor/${singleData._id}`}
                      key="details"
                    >
                      <Button
                        type="primary"
                        icon={<InfoCircleOutlined />}
                      >
                        Details
                      </Button>
                    </Link>,
                  ]}
                >
                  <Title
                    level={3}
                    style={{ textAlign: "center", marginBottom: 16 }}
                  >
                    {singleData.fullName}
                  </Title>
                  <Divider style={{ margin: "12px 0" }} />
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <InfoItem
                      label="Institution"
                      value={singleData.institution}
                    />
                    <InfoItem
                      label="Medium"
                      value={singleData.medium}
                    />
                    <InfoItem
                      label="Preferred Subject"
                      value={singleData.preferredSubject}
                    />
                    <InfoItem
                      label="Preferred Class"
                      value={singleData.preferredClass}
                    />
                    <InfoItem
                      label="Expected Salary"
                      value={singleData.expectedMinSalary}
                    />
                  </Space>
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
const InfoItem = ({ label, value }: any) => (
  <Row
    justify="space-between"
    align="middle"
  >
    <Col>
      <Text strong>{label}:</Text>
    </Col>
    <Col>
      <Tag color="blue">{value}</Tag>
    </Col>
  </Row>
);
