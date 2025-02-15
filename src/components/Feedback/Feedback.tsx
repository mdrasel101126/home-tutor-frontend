"use client";
import { useGetFeedbacksQuery } from "@/redux/api/feedbackApi";
import { isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Empty, Rate, Row, Spin, Typography } from "antd";

import { UserOutlined, MessageOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
import Link from "next/link";

const Feedback = () => {
  const { data, isLoading } = useGetFeedbacksQuery({ page: 1, limit: 12 });

  console.log(data);

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
          <Spin
            tip="Loading"
            size="large"
          ></Spin>
        </Empty>
      ) : (
        <FeedbackCards data={data} />
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

interface Feedback {
  name: string;
  feedback: string;
  rating?: number;
}

interface FeedbackCardsProps {
  data: {
    data: {
      data: Feedback[];
    };
  };
}

const FeedbackCards: React.FC<FeedbackCardsProps> = ({ data }) => {
  const feedbacks = data?.data?.data || [];

  if (feedbacks.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No feedback available"
        style={{ margin: "50px auto" }}
      />
    );
  }

  return (
    <Row
      gutter={[24, 24]}
      justify="center"
      style={{ padding: "20px" }}
    >
      {feedbacks.slice(0, 9).map((singleFeedback, index) => (
        <Col
          key={index}
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
        >
          <Card
            hoverable
            style={{ height: "100%" }}
            actions={[
              <Rate
                key="rate"
                disabled
                defaultValue={singleFeedback.rating || 5}
              />,
            ]}
          >
            <Card.Meta
              avatar={
                <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              }
              title={<Title level={4}>{singleFeedback.name}</Title>}
              description={
                <>
                  <MessageOutlined
                    style={{ marginRight: "8px", color: "#52c41a" }}
                  />
                  <Paragraph ellipsis={{ rows: 3 }}>
                    {singleFeedback.feedback}
                  </Paragraph>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
