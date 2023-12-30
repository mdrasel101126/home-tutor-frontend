"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Empty, Input, Row, Select } from "antd";
import Image from "next/image";
import maleTeacher from "../../../assets/maleTeacher.png";
import femaleTeacher from "../../../assets/femaleTeacher.png";
import { useAllTutorsByUserQuery } from "@/redux/api/tutorApi";
import Link from "next/link";
import { addToLocalStorage } from "@/services/cart.service";
import { useDebounced } from "@/redux/hooks";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import { genderOptions, pageOptions } from "@/constants/golbal";

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
        data?.data?.meta?.count / data?.data?.meta?.limit
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
        </Button>
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
        <Col sm={12} md={8} lg={4} style={{ marginLeft: "5px" }}>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col sm={12} md={8} lg={4} style={{ marginLeft: "5px" }}>
          <Input
            size="large"
            type="number"
            placeholder="Maximum Salary"
            onChange={(e) => setMaxSalary(parseInt(e.target.value))}
          />
        </Col>
        <Col sm={12} md={8} lg={4} style={{ marginLeft: "5px" }}>
          <Select
            onChange={(e) => setGender(e)}
            size="large"
            options={genderOptions as SelectOptions[]}
            placeholder="Select Gender"
          />
        </Col>
        <Col sm={12} md={8} lg={4} style={{ marginLeft: "5px" }}>
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
            <Col key={index} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: 240, margin: "0 auto 15px auto" }}
                cover={
                  <Image
                    alt="tutorImage"
                    src={
                      singleData.gender == "male" ? maleTeacher : femaleTeacher
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
                  <span style={{ fontWeight: "bold" }}>Preferred Subject:</span>{" "}
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
                  </Col>
                  <Col span={11}>
                    <Link href={`/tutor/${singleData._id}`}>
                      <Button
                        style={{
                          backgroundColor: "#fffbbd",
                          color: "#edd874",
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
