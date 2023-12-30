"use client";
import { Button, Col, Row, message } from "antd";
import loginImg from "../../assets/Login.png";
import React from "react";
import Image from "next/image";
import FormInput from "../Forms/FormInput";
import Form from "@/components/Forms/Form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { registrationTutorSchema } from "@/schemas/allValidationSchema";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useTutorRegistrationMutation } from "@/redux/api/tutorApi";
import FormMultiSelectField from "../Forms/FormMultiSelectField";
import {
  classOptions,
  expertInOptions,
  genderOptions,
  groupOptions,
  mediumOptions,
  statusOptions,
} from "@/constants/golbal";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";

type FormValues = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
};

const TutorRegistration = () => {
  const router = useRouter();
  if (isLoggedIn()) {
    router.push("/home");
  }
  const [tutorRegistration] = useTutorRegistrationMutation(undefined);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    data.expectedMinSalary = parseInt(data.expectedMinSalary);
    data.dayPerWeek = parseInt(data.dayPerWeek);
    data.currentTuition = parseInt(data.currentTuition);
    data.maximumTuitionCapacity = parseInt(data.maximumTuitionCapacity);
    try {
      const res = await tutorRegistration({ ...data }).unwrap();
      if (res.statusCode === 500) {
        message.error(res.message);
      } else {
        message.success("Tutor registration successfully!!! Please login...");
        router.push("/login-tutor");
      }
    } catch (error) {
      message.error("Something went wrong");
      router.push("/home");
    }
  };
  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "85vh",
        }}
      >
        <Col sm={12} md={16} lg={10}>
          <div
            style={{
              width: "100%",
            }}
          >
            <Image
              style={{ width: "100%" }}
              src={loginImg}
              width={400}
              alt="login image"
            />
          </div>
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1
            style={{
              margin: "0 0 15px 0px",
              textAlign: "center",
            }}
          >
            Tutor Registration
          </h1>
          <div style={{ margin: "0 20px" }}>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(registrationTutorSchema)}
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="fullName"
                      type="text"
                      size="large"
                      label="Full Name"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="phoneNumber"
                      type="text"
                      size="large"
                      label="Phone"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="email"
                      type="email"
                      size="large"
                      label="Email"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="password"
                      type="password"
                      size="large"
                      label="Password"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="presentAddress"
                      type="text"
                      size="large"
                      label="Address"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      options={genderOptions as SelectOptions[]}
                      name="gender"
                      label="Gender"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="qualification"
                      type="text"
                      size="large"
                      label="Qualification"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="institution"
                      type="text"
                      size="large"
                      label="Institution"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      options={groupOptions as SelectOptions[]}
                      name="group"
                      label="Group"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="subject"
                      type="text"
                      size="large"
                      label="Subject"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      options={mediumOptions as SelectOptions[]}
                      name="medium"
                      label="Medium"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormMultiSelectField
                      options={expertInOptions as SelectOptions[]}
                      name="expertIn"
                      label="Experts In"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="expectedMinSalary"
                      type="number"
                      size="large"
                      label="Min Salary"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="dayPerWeek"
                      type="number"
                      size="large"
                      label="Weekly..."
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={8}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="maximumTuitionCapacity"
                      type="number"
                      size="large"
                      label="Max Tuition"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="currentTuition"
                      type="number"
                      size="large"
                      label="Current Tuition No."
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="currentStatus"
                      options={statusOptions as SelectOptions[]}
                      label="Current Status"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="preferredSubject"
                      type="text"
                      size="large"
                      label="Preferred Subject"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="preferredClass"
                      options={classOptions as SelectOptions[]}
                      label="Preferred Class"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      options={mediumOptions as SelectOptions[]}
                      name="preferredMedium"
                      label="Preferred Medium"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      name="preferredArea"
                      type="text"
                      size="large"
                      label="Preferred Area"
                      required
                    />
                  </Col>
                </Row>
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
                    width: "50%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Registration
                </Button>
              </div>
            </Form>
          </div>

          <h4 style={{ marginTop: "30px", textAlign: "center" }}>
            Already have an account?
            <Link href="/login-tutor"> Please Login</Link>
          </h4>
        </Col>
      </Row>
      <h4 style={{ textAlign: "center", color: "black", marginTop: "30px" }}>
        Are you a user?
        <Link
          href="/registration"
          style={{ textDecoration: "none", color: "#0958d9" }}
        >
          {" "}
          User Registration
        </Link>
      </h4>{" "}
      <div
        style={{
          display: "flex",
        }}
      >
        <Button
          style={{
            backgroundColor: "#fffbbd",
            color: "#80743c",
            margin: "20px auto",
          }}
        >
          <Link
            href="/home"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Go To Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TutorRegistration;
