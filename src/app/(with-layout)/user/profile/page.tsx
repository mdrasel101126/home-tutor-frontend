"use client";
import { useUserOwnProfileQuery } from "@/redux/api/userApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Empty, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();

  // Redirect if not logged in or role is tutor
  if (typeof window !== "undefined" && (!isLoggedIn() || role === "tutor")) {
    router.push("/home");
  }

  const { data, isLoading } = useUserOwnProfileQuery(undefined);

  return (
    <div style={{ backgroundColor: "white", padding: "20px" }}>
      {/* Profile Section */}
      <Card
        style={{
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        bodyStyle={{ padding: "20px" }}
      >
        <h4
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          My Profile
        </h4>
        <Row
          justify="center"
          align="middle"
        >
          <Col
            xs={24}
            md={16}
            lg={12}
          >
            <Card
              style={{
                marginBottom: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p style={{ margin: "10px 0", fontSize: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                {data?.data?.fullName}
              </p>
              <p style={{ margin: "10px 0", fontSize: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {data?.data?.email}
              </p>
              <p style={{ margin: "10px 0", fontSize: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Number:</span>{" "}
                {data?.data?.phoneNumber}
              </p>
              <p style={{ margin: "10px 0", fontSize: "16px" }}>
                <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                {data?.data?.role}
              </p>
            </Card>
            <Row
              justify="space-around"
              gutter={[16, 16]}
            >
              <Col
                span={12}
                md={8}
              >
                <Link href="/user/edit-profile">
                  <Button
                    style={{
                      backgroundColor: "#fffbbd",
                      color: "#80743c",
                      width: "100%",
                      borderRadius: "4px",
                    }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </Col>
              <Col
                span={12}
                md={8}
              >
                <Link href="/user/change-password">
                  <Button
                    style={{
                      backgroundColor: "#c3ffbd",
                      color: "#07b318",
                      width: "100%",
                      borderRadius: "4px",
                    }}
                  >
                    Change Password
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* History Section */}
      <h4
        style={{
          textAlign: "center",
          fontSize: "24px",
          margin: "20px 0",
          color: "#333",
        }}
      >
        History
      </h4>
      <Row
        justify="center"
        gutter={[16, 16]}
        style={{ width: "100%", padding: "20px" }}
      >
        {data?.data?.history?.length ? (
          data.data.history.map((his: any, index: number) => (
            <Col
              key={index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Card
                hoverable
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  background: "#f7f7e6",
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
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No history available"
            style={{ margin: "20px 0" }}
          />
        )}
      </Row>
    </div>
  );
};

export default UserProfile;
