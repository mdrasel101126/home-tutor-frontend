"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import maleTeacher from "../../../assets/maleTeacher.png";
import femaleTeacher from "../../../assets/femaleTeacher.png";
import { useAllTutorsByUserQuery } from "@/redux/api/tutorApi";
import Link from "next/link";
import { addToLocalStorage } from "@/services/cart.service";
import { useDebounced } from "@/redux/hooks";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import { genderOptions, pageOptions } from "@/constants/golbal";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const AllTutorsForAdmin = ({ searchParams }: any) => {
  const query: Record<string, any> = {};
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [maxSalary, setMaxSalary] = useState<number>(0);
  const [gender, setGender] = useState<string | null>(null);
  const [preferableClass, setPreferableClass] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { preferClass } = searchParams;

  query["limit"] = size;
  query["page"] = pageNo;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  if (!!preferClass) {
    query["preferredClass"] = preferClass;
  }
  if (!!gender) {
    query["gender"] = gender;
  }
  if (!!maxSalary) {
    query["highestExpectedSalary"] = maxSalary;
  }
  if (!!gender) {
    query["gender"] = gender;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const clearSearch = () => {
    setSearchTerm("");
    setGender(null);
    setPreferableClass(null);
    setMaxSalary(0);
  };
  const { data, isLoading } = useAllTutorsByUserQuery({ ...query });
  useEffect(() => {
    if (data) {
      const calculatedTotalPage = Math.ceil(
        data?.data?.meta?.count / data?.data?.meta?.limit,
      );
      setTotalPage(calculatedTotalPage);
    }
  }, [data]);

  const renderPageButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPage; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => setPageNo(page)}
          style={{
            backgroundColor: "#fffbbd",
            color: pageNo === page ? "black" : "#b3a562",
            marginRight: "5px",
            fontWeight: pageNo === page ? "bold" : "normal",
          }}
        >
          {page}
        </Button>,
      );
    }
    return buttons;
  };
  return (
    <div>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "0 5px 10px 5px",
          backgroundColor: "white",
        }}
      >
        All Tutors
      </h4>
      <Row
        justify="start"
        align="middle"
        style={{
          background: "white",
          padding: "20px",
        }}
      >
        <Col
          sm={12}
          md={8}
          lg={4}
          style={{ marginLeft: "5px" }}
        >
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col
          sm={12}
          md={8}
          lg={4}
          style={{ marginLeft: "5px" }}
        >
          <Input
            size="large"
            type="number"
            placeholder="Maximum Salary"
            onChange={(e) => setMaxSalary(parseInt(e.target.value))}
          />
        </Col>
        <Col
          sm={12}
          md={8}
          lg={4}
          style={{ marginLeft: "5px" }}
        >
          <Select
            onChange={(e) => setGender(e)}
            size="large"
            options={genderOptions as SelectOptions[]}
            placeholder="Select Gender"
          />
        </Col>
        <Col
          sm={12}
          md={8}
          lg={4}
          style={{ marginLeft: "5px" }}
        >
          <Button
            style={{
              backgroundColor: "#fffbbd",
              color: "#edd874",
              fontWeight: "bold",
            }}
            onClick={clearSearch}
          >
            Clear Search
          </Button>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{
          backgroundColor: "white",
          minHeight: "95vh",
          padding: "20px 30px 20px 20px",
        }}
      >
        {data?.data?.data?.length !== 0 ? (
          data?.data?.data?.map((singleData: any, index: number) => (
            <Col
              key={index}
              sm={12}
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
      <div
        style={{
          backgroundColor: "white",
          color: "#b3a562",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 0 10px 0",
        }}
      >
        <div>
          <span style={{ marginRight: "20px" }}>Page No: </span>
          {renderPageButtons()}
        </div>
        <div style={{ marginLeft: "30px" }}>
          <Select
            onChange={(e) => setSize(e)}
            size="small"
            options={pageOptions}
            placeholder="Count"
          />
        </div>
      </div>
    </div>
  );
};

export default AllTutorsForAdmin;
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
