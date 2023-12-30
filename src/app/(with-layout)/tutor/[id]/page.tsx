/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import maleTeacher from "../../../../assets/maleTeacher.png";
import femaleTeacher from "../../../../assets/femaleTeacher.png";
import { Button, Card, Col, Empty, Row, message } from "antd";
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
        <Row
          justify="center"
          style={{ backgroundColor: "white", padding: "10px" }}
          align="middle"
        >
          <Col sm={12} md={9} lg={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: "100%" }}
                src={data?.data?.gender == "male" ? maleTeacher : femaleTeacher}
                width={300}
                alt="login image"
              />
            </div>
          </Col>
          <Col sm={12} md={15} lg={16}>
            <div
              style={{
                width: "100%",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  margin: "10px 60px 20px -40px",
                  backgroundColor: "white",
                  textDecoration: "underline",
                }}
              >
                Full Name : {data?.data?.fullName}
              </h4>
              <Row>
                <Col style={{ marginBottom: "20px" }} md={12}>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
                    {data?.data?.gender}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Qualification:</span>{" "}
                    {data?.data?.qualification}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Institution:</span>{" "}
                    {data?.data?.institution}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Group:</span>{" "}
                    {data?.data?.group}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Subject:</span>{" "}
                    {data?.data?.subject}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Medium:</span>{" "}
                    {data?.data?.medium}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Present Address:</span>{" "}
                    {data?.data?.presentAddress}
                  </p>{" "}
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Current Status:</span>{" "}
                    {data?.data?.currentStatus}
                  </p>
                </Col>
                <Col md={12}>
                  <div style={{ margin: "10px 0" }}>
                    <p style={{ fontWeight: "bold", display: "inline" }}>
                      Expert In:
                    </p>
                    {data?.data?.expertIn?.map((ex: any, index: number) => (
                      <span
                        style={{ marginLeft: "15px", color: "gray" }}
                        key={index}
                      >
                        "{ex}"
                      </span>
                    ))}
                  </div>{" "}
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Preferred Class:</span>{" "}
                    {data?.data?.preferredArea}
                  </p>{" "}
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Preferred Medium:
                    </span>{" "}
                    {data?.data?.preferredMedium}
                  </p>{" "}
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Preferred Subject:
                    </span>{" "}
                    {data?.data?.preferredSubject}
                  </p>{" "}
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Preferred Area:</span>{" "}
                    {data?.data?.preferredClass}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Day Per Week:</span>{" "}
                    {data?.data?.dayPerWeek}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>
                      Expected Minimum Salary:
                    </span>{" "}
                    {data?.data?.expectedMinSalary}
                  </p>
                  <p style={{ margin: "10px 0" }}>
                    <span style={{ fontWeight: "bold" }}>Current Tuition:</span>{" "}
                    {data?.data?.currentTuition}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        {role == "tutor" || (
          <Row justify="space-evenly">
            <Col span={11} lg={6}>
              <Button
                style={{
                  backgroundColor: "#c3ffbd",
                  color: "#07b318",
                  width: "100%",
                }}
                onClick={() =>
                  addToLocalStorage(
                    data?.data?._id,
                    data?.data?.fullName,
                    data?.data?.medium,
                    data?.data?.preferredClass,
                    data?.data?.expectedMinSalary
                  )
                }
              >
                <h5>Add to cart</h5>
              </Button>
            </Col>{" "}
            <Col span={11} lg={6}>
              {isLoggedIn() ? (
                <Link href={`/booking/${data?.data?._id}`}>
                  <Button
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Booking
                  </Button>
                </Link>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "bold",
                    width: "100%",
                  }}
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
            <Col key={index} sm={12} md={6} lg={4}>
              <Card
                hoverable
                style={{
                  width: 180,
                  background: "white",
                  padding: "0",
                }}
              >
                <h4
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {rev.name}
                </h4>
                <p style={{ margin: "10px 0 0 0" }}>{rev.review}</p>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  <span style={{ fontWeight: "bold" }}>
                    Rating: {rev.rating}
                  </span>
                </p>
              </Card>
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
            <Form submitHandler={onSubmit} resolver={yupResolver(reviewSchema)}>
              <h1
                style={{
                  margin: "0 0 15px 0px",
                  textAlign: "center",
                }}
              >
                Review Tutor
              </h1>
              <div style={{ margin: "5px 0" }}>
                <FormTextArea name="review" label="Your review" required />
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
                "You are a tutor.Please login as a user to review tutor..."
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
