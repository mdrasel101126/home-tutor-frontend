"use client";
import AdminAllUsers from "@/components/Bookings/AdminAllUsers";
import { pageOptions } from "@/constants/golbal";
import { useAllUserByAdminQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Card, Empty, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [size, setSize] = useState<number>(10);
  const [pageNo, setPageNo] = useState<number>(1);
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
  const { data } = useAllUserByAdminQuery({ ...query });
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
    <Card
      bodyStyle={{ padding: "20px", overflow: "hidden", minHeight: "100vh" }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "10px 0",
          backgroundColor: "white",
        }}
      >
        All Users
      </h4>
      <div style={{ background: "white", display: "flex", marginTop: "-58px" }}>
        <Input
          size="large"
          placeholder="Search"
          style={{ width: "200px", margin: "5px 20px 0 auto" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row
        justify="space-between"
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "20px",
        }}
        align="middle"
        gutter={[10, 24]}
      >
        {data?.data?.data.length !== 0 ? (
          data?.data?.data?.map((booking: any, index: number) => (
            <>
              <AdminAllUsers data={booking} key={index} />
            </>
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
        </div>{" "}
        <div style={{ marginLeft: "30px" }}>
          <Select
            onChange={(e) => setSize(e)}
            size="small"
            options={pageOptions}
            placeholder="Count"
          />
        </div>
      </div>
    </Card>
  );
};

export default AllUsers;
