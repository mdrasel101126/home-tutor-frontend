"use client";
import { useUserOwnProfileQuery } from "@/redux/api/userApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Empty, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!isLoggedIn() || role == "tutor") {
      router.push("/home");
    }
  }

  const { data, isLoading } = useUserOwnProfileQuery(undefined);
  return (
    <div>
      <Card bodyStyle={{ padding: "20px", overflow: "hidden" }}>
        <h4
          style={{
            textAlign: "center",
            fontSize: "30px",
            margin: "10px 0",
            backgroundColor: "white",
          }}
        >
          My Profile
        </h4>
        <Row
          justify="center"
          style={{ backgroundColor: "white", padding: "10px" }}
          align="middle"
        >
          <Col sm={12} md={15} lg={16}>
            <div
              style={{
                width: "100%",
              }}
            >
              <Card style={{ marginBottom: "20px" }}>
                <p style={{ margin: "10px 0", fontSize: "15px" }}>
                  <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                  {data?.data?.fullName}
                </p>
                <p style={{ margin: "10px 0", fontSize: "15px" }}>
                  <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                  {data?.data?.email}
                </p>
                <p style={{ margin: "10px 0", fontSize: "15px" }}>
                  <span style={{ fontWeight: "bold" }}>Number:</span>{" "}
                  {data?.data?.phoneNumber}
                </p>
                <p style={{ margin: "10px 0", fontSize: "15px" }}>
                  <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                  {data?.data?.role}
                </p>
              </Card>
              <Row justify="space-around">
                <Col span={11} lg={6}>
                  <Link href="/user/edit-profile">
                    {" "}
                    <Button
                      style={{
                        backgroundColor: "#fffbbd",
                        color: "#80743c",
                        width: "100%",
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </Col>
                <Col span={12} lg={6}>
                  <Link href="/user/change-password">
                    <Button
                      style={{
                        backgroundColor: "#c3ffbd",
                        color: "#07b318",
                        width: "100%",
                      }}
                    >
                      Change Password
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "20px 0 5px",
          backgroundColor: "white",
        }}
      >
        History
      </h4>
      <Row
        justify="center"
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "20px",
        }}
        align="middle"
        gutter={[10, 24]}
      >
        {data?.data?.history?.length !== 0 ? (
          data?.data?.history?.map((his: any, index: number) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <Card
                hoverable
                style={{
                  width: 180,
                  background: "#f7f7e6",
                  padding: "0",
                }}
              >
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Day per week:</span>{" "}
                  {his.dayPerWeek}
                </p>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Salary:</span>{" "}
                  {his.maxSalary}
                </p>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                  {his.location}
                </p>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Started:</span>{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(his.teachingStartDate))}
                </p>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                  {his.description}
                </p>
              </Card>
            </Col>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
    </div>
  );
};

export default UserProfile;
