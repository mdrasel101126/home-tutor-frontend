/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import maleTeacher from "../../../../assets/maleTeacher.png";
import femaleTeacher from "../../../../assets/femaleTeacher.png";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  useReviewTutorMutation,
  useSingleTutorByUserQuery,
} from "@/redux/api/tutorApi";
import { addToLocalStorage } from "@/services/cart.service";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Form from "@/components/Forms/Form";
import FormTextArea from "@/components/Forms/FormTextArea";
import ModalComponent from "@/components/ui/Modal";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import { ratingOptions } from "@/constants/golbal";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/schemas/allValidationSchema";
import {
  UserOutlined,
  BookOutlined,
  BankOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";

const { Title, Text } = Typography;

const TutorDetails = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useSingleTutorByUserQuery(params.id);
  const [postReview] = useReviewTutorMutation(undefined);

  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { role } = getUserInfo() as any;
  const onSubmit = async (review: any) => {
    const reviewData = {
      id: data?.data?._id,
      body: { review: review.review, rating: +review.rating },
    };
    setModalData(reviewData);
    setOpen(true);
  };

  const tutorData = data?.data;
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
          Tutor Details
        </h4>
        <Card>
          <Row
            gutter={[24, 24]}
            justify="center"
            align="top"
          >
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={6}
            >
              <Card
                cover={
                  <Image
                    src={
                      tutorData?.gender === "male" ? maleTeacher : femaleTeacher
                    }
                    alt={`${tutorData?.fullName} profile`}
                    width={300}
                    height={300}
                    layout="responsive"
                    objectFit="cover"
                  />
                }
              >
                <Card.Meta
                  title={<Title level={3}>{tutorData?.fullName}</Title>}
                  description={
                    <Space direction="vertical">
                      <Tag
                        icon={<UserOutlined />}
                        color="blue"
                      >
                        {tutorData?.gender}
                      </Tag>
                      <Tag
                        icon={<BookOutlined />}
                        color="green"
                      >
                        {tutorData?.qualification}
                      </Tag>
                      <Tag
                        icon={<BankOutlined />}
                        color="orange"
                      >
                        {tutorData?.institution}
                      </Tag>
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={16}
              lg={18}
            >
              <Descriptions
                title="Personal Information"
                bordered
                column={{ xs: 1, sm: 2, md: 2, lg: 3 }}
              >
                <Descriptions.Item label="Group">
                  {tutorData?.group}
                </Descriptions.Item>
                <Descriptions.Item label="Subject">
                  {tutorData?.subject}
                </Descriptions.Item>
                <Descriptions.Item label="Medium">
                  {tutorData?.medium}
                </Descriptions.Item>
                <Descriptions.Item label="Present Address">
                  {tutorData?.presentAddress}
                </Descriptions.Item>
                <Descriptions.Item label="Current Status">
                  {tutorData?.currentStatus}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Expertise</Divider>
              <Space wrap>
                {tutorData?.expertIn?.map(
                  (expertise: string, index: number) => (
                    <Tag
                      key={index}
                      color="purple"
                    >
                      {expertise}
                    </Tag>
                  ),
                )}
              </Space>

              <Divider orientation="left">Preferences</Divider>
              <Descriptions
                bordered
                column={{ xs: 1, sm: 2, md: 2, lg: 3 }}
              >
                <Descriptions.Item label="Preferred Class">
                  {tutorData?.preferredArea}
                </Descriptions.Item>
                <Descriptions.Item label="Preferred Medium">
                  {tutorData?.preferredMedium}
                </Descriptions.Item>
                <Descriptions.Item label="Preferred Subject">
                  {tutorData?.preferredSubject}
                </Descriptions.Item>
                <Descriptions.Item label="Preferred Area">
                  {tutorData?.preferredClass}
                </Descriptions.Item>
                <Descriptions.Item label="Day Per Week">
                  {tutorData?.dayPerWeek}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Financial Information</Divider>
              <Descriptions
                bordered
                column={1}
              >
                <Descriptions.Item
                  label={
                    <Text strong>
                      <DollarOutlined /> Expected Minimum Salary
                    </Text>
                  }
                >
                  <Text
                    type="success"
                    strong
                  >
                    {tutorData?.expectedMinSalary}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Text strong>
                      <TeamOutlined /> Current Tuition
                    </Text>
                  }
                >
                  {tutorData?.currentTuition}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
        {role == "tutor" || (
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ marginTop: 24 }}
          >
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                block
                onClick={() =>
                  addToLocalStorage(
                    data?.data?._id,
                    data?.data?.fullName,
                    data?.data?.medium,
                    data?.data?.preferredClass,
                    data?.data?.expectedMinSalary,
                  )
                }
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              >
                Add to cart
              </Button>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              {isLoggedIn() ? (
                <Link href={`/booking/${data?.data?._id}`}>
                  <Button
                    type="primary"
                    icon={<CalendarOutlined />}
                    size="large"
                    block
                  >
                    Book Tutor
                  </Button>
                </Link>
              ) : (
                <Button
                  type="primary"
                  icon={<CalendarOutlined />}
                  block
                  onClick={() => {
                    message.error("Please login...");
                    router.push("/login");
                  }}
                >
                  Booking
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Card>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "20px 0 5px",
        }}
      >
        Tutors Review
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
        {data?.data?.reviews?.length !== 0 ? (
          data?.data?.reviews?.map((rev: any, index: number) => (
            <Col
              key={index}
              sm={12}
              md={6}
              lg={4}
            >
              <ReviewCard rev={rev} />
            </Col>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
      {isLoggedIn() && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            padding: "20px 0",
          }}
        >
          <Card bodyStyle={{ padding: "20px 20px", overflow: "hidden" }}>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(reviewSchema)}
            >
              <h1
                style={{
                  margin: "0 0 15px 0px",
                  textAlign: "center",
                }}
              >
                Review Tutor
              </h1>
              <div style={{ margin: "5px 0" }}>
                <FormTextArea
                  name="review"
                  label="Your review"
                  required
                />
              </div>
              <div style={{ margin: "5px 0" }}>
                <FormSelectField
                  options={ratingOptions as SelectOptions[]}
                  name="rating"
                  label="Your rating"
                  required
                />
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                }}
              >
                <Button
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}
      <ModalComponent
        title="Review"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            if (role == "tutor") {
              message.error(
                "You are a tutor.Please login as a user to review tutor...",
              );
              setOpen(false);
              return;
            }
            const res = await postReview(modalData).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              message.success("Thanks for your review!!!");
              setOpen(false);
            }
          } catch (error) {
            message.error("Something went wrong");
          }
        }}
      >
        <p className="my-5">Are you sure to review the tutor?</p>
      </ModalComponent>
    </div>
  );
};

export default TutorDetails;

interface ReviewCardProps {
  rev: {
    name: string;
    review: string;
    rating: number;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ rev }) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <Avatar
          icon={<UserOutlined />}
          size="large"
          style={{ marginRight: 12 }}
        />
        <Title
          level={4}
          style={{ margin: 0 }}
        >
          {rev.name}
        </Title>
      </div>
      <Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
          symbol: "Read more",
        }}
        style={{ flex: 1 }}
      >
        {rev.review}
      </Paragraph>
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <Rate
          disabled
          defaultValue={rev.rating}
        />
        <Paragraph style={{ marginTop: 8, fontWeight: "bold" }}>
          Rating: {rev.rating}
        </Paragraph>
      </div>
    </Card>
  );
};
