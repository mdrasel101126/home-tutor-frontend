"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Empty, Input, Row, Select } from "antd";
import Image from "next/image";
import maleTeacher from "../../../../../assets/maleTeacher.png";
import femaleTeacher from "../../../../../assets/femaleTeacher.png";
import { useGetAllTutorsByAdminQuery } from "@/redux/api/tutorApi";
import Link from "next/link";
import { useDebounced } from "@/redux/hooks";
import { pageOptions } from "@/constants/golbal";
import { getUserInfo } from "@/services/auth.service";

const AllTutorsForAdmin = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageNo, setPageNo] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 500,
  });
  query["limit"] = size;
  query["page"] = pageNo;

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllTutorsByAdminQuery({ ...query });
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
    <>
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
      <div style={{ background: "white", display: "flex" }}>
        <Input
          size="large"
          placeholder="Search"
          style={{ width: "200px", margin: "5px 20px 0 auto" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row
        justify="center"
        style={{ backgroundColor: "white", padding: "20px 30px 20px 20px" }}
        align="middle"
      >
        {data?.data?.data.length !== 0 ? (
          data?.data?.data?.map((singleData: any, index: number) => (
            <Col key={index} md={15} lg={8}>
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
                  {role == "admin_user" || (
                    <Col span={11}>
                      <Link href={`/dashboard/update-tutor/${singleData._id}`}>
                        <Button
                          style={{
                            backgroundColor: "#c3ffbd",
                            color: "#07b318",
                            width: "100%",
                          }}
                        >
                          <h5>Update</h5>
                        </Button>
                      </Link>
                    </Col>
                  )}
                  <Col span={11}>
                    {role != "admin_user" && (
                      <Link href={`/dashboard/tutor/${singleData._id}`}>
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
                    )}
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
    </>
  );
};

export default AllTutorsForAdmin;
