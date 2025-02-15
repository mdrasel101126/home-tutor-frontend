"use client";
import { Button, Card, Col, Input, Row, message } from "antd";
import React, { useState } from "react";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useRouter } from "next/navigation";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { SubmitHandler } from "react-hook-form";

import ModalComponent from "@/components/ui/Modal";
import { useUserOwnProfileQuery } from "@/redux/api/userApi";
import { useSingleTutorByUserQuery } from "@/redux/api/tutorApi";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import FormTextArea from "@/components/Forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@/schemas/allValidationSchema";
import { useTutorBookingMutation } from "@/redux/api/bookingApi";

const Booking = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { role } = getUserInfo() as any;
  if (typeof window !== "undefined") {
    if (!isLoggedIn() || role == "tutor") {
      router.push("/login");
    }
  }
  const { data: tutorData } = useSingleTutorByUserQuery(params.id);
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState({});

  const { data } = useUserOwnProfileQuery(undefined);
  const [tutorBooking] = useTutorBookingMutation(undefined);

  const onSubmit: SubmitHandler<any> = async (submitData: any) => {
    const submittedDate = submitData.teachingStartDate?.$d;
    const submittedTime = submitData.teachingTime;
    if (!submittedTime) {
      message.error("Please select a time...");
    }
    if (!submittedDate) {
      message.error("Please select a upcoming date...");
    }
    if (!submittedDate || !submittedTime) {
      return;
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = submittedDate.toLocaleDateString("en-US", options);
    const bookingData = {
      tutorId: params.id,
      teachingStartDate: formattedDate,
      message: {
        dayPerWeek: submitData.dayPerWeek,
        teachingTime: submittedTime,
        maxSalary: submitData.maxSalary,
        location: submitData.location,
        description: submitData.description,
      },
    };

    setOpen(true);
    setModalData(bookingData);
  };
  return (
    <div>
      <Card
        bodyStyle={{ padding: "50px", overflow: "hidden" }}
        style={{
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            margin: "0 0 15px 0px",
            textAlign: "center",
          }}
        >
          Tutor Booking
        </h1>

        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(bookingSchema)}
        >
          <Row
            justify="center"
            align="middle"
          >
            <Col
              sm={12}
              md={8}
              lg={8}
            >
              <div
                style={{
                  margin: "0 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div>
                  Tutor Name
                  <Input
                    name="fullName"
                    type="text"
                    size="large"
                    value={tutorData?.data?.fullName}
                  />
                </div>
                <div>
                  Your Name
                  <Input
                    name="fullName"
                    type="text"
                    size="large"
                    value={data?.data?.fullName}
                  />
                </div>
                <div>
                  <FormDatePicker
                    name="teachingStartDate"
                    label="Teaching Start Date"
                    size="large"
                    required
                  />
                </div>
                <div>
                  <FormInput
                    name="dayPerWeek"
                    type="number"
                    size="large"
                    label="Day per week"
                    required
                  />
                </div>
                <div>
                  <FormTimePicker
                    name="teachingTime"
                    label="Teaching Time"
                    required
                  />
                </div>
                <div>
                  <FormInput
                    name="maxSalary"
                    type="number"
                    size="large"
                    label="Maximum Salary"
                    required
                  />
                </div>
                <div>
                  <FormInput
                    name="location"
                    type="text"
                    size="large"
                    label="Your Location"
                    required
                  />
                </div>
                <div>
                  <FormTextArea
                    name="description"
                    label="Description"
                    required
                  />
                </div>
              </div>
            </Col>
          </Row>
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
              }}
              type="primary"
              htmlType="submit"
            >
              Booking
            </Button>
          </div>
        </Form>
      </Card>
      <ModalComponent
        title="Tutor Booking"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            const res = await tutorBooking(modalData).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              message.success("Booking successfully done!!!");
              router.push("/user/booking");
            }
          } catch (error) {
            message.error("Something went wrong");
          }
        }}
      >
        <p className="my-5">
          Are you sure to book Mr. {tutorData?.data?.fullName} as a tutor?
        </p>
      </ModalComponent>
    </div>
  );
};

export default Booking;
