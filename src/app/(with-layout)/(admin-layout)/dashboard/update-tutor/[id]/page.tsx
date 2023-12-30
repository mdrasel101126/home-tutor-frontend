"use client";
import { Button, Card, Col, Row, message } from "antd";
import React, { useState } from "react";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useRouter } from "next/navigation";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { SubmitHandler } from "react-hook-form";
import {
  useGetSingleTutorByAdminQuery,
  useUpdateOwnProfileMutation,
} from "@/redux/api/tutorApi";
import FormSelectField from "@/components/Forms/FormSelectField";
import {
  classOptions,
  expertInOptions,
  genderOptions,
  groupOptions,
  mediumOptions,
  statusOptions,
} from "@/constants/golbal";
import FormMultiSelectField, {
  SelectOptions,
} from "@/components/Forms/FormMultiSelectField";
import ModalComponent from "@/components/ui/Modal";

const UpdateTutorByAdmin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { role } = getUserInfo() as any;
  if (typeof window !== "undefined") {
    if (!isLoggedIn() || role == "admin_user") {
      router.push("/home");
    }
  }
  const [open, setOpen] = useState<boolean>(false);
  const [Id, setId] = useState<string>("");
  const [modalData, setModalData] = useState({});

  const { data } = useGetSingleTutorByAdminQuery(params.id);
  const [tutorUpdate] = useUpdateOwnProfileMutation(undefined);
  const onSubmit: SubmitHandler<any> = async (submitData: any) => {
    submitData.expectedMinSalary = parseInt(submitData.expectedMinSalary);
    submitData.dayPerWeek = parseInt(submitData.dayPerWeek);
    submitData.currentTuition = parseInt(submitData.currentTuition);
    submitData.maximumTuitionCapacity = parseInt(
      submitData.maximumTuitionCapacity
    );
    const updatedData = {
      fullName: submitData?.fullName,
      gender: submitData?.gender,
      qualification: submitData?.qualification,
      institution: submitData?.institution,
      group: submitData?.group,
      medium: submitData?.medium,
      presentAddress: submitData?.presentAddress,
      expertIn: submitData?.expertIn,
      phoneNumber: submitData?.phoneNumber,
      subject: submitData?.subject,
      currentTuition: submitData?.currentTuition,
      expectedMinSalary: submitData?.expectedMinSalary,
      maximumTuitionCapacity: submitData?.maximumTuitionCapacity,
      dayPerWeek: submitData?.dayPerWeek,
      preferredMedium: submitData?.preferredMedium,
      preferredSubject: submitData?.preferredSubject,
      preferredArea: submitData?.preferredArea,
      preferredClass: submitData?.preferredClass,
      currentStatus: submitData?.currentStatus,
    };
    if (data?.data?.phoneNumber === submitData.phoneNumber) {
      delete updatedData.phoneNumber;
    }
    setOpen(true);
    setId(submitData?._id);
    setModalData(updatedData);
  };
  return (
    <div>
      <Card bodyStyle={{ padding: "20px", overflow: "hidden" }}>
        <h1
          style={{
            margin: "0 0 15px 0px",
            textAlign: "center",
          }}
        >
          Update Profile
        </h1>
        <div style={{ margin: "0 20px" }}>
          <Form submitHandler={onSubmit} defaultValues={data?.data}>
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
                    label="Current Tuition no."
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
                  <FormInput
                    name="preferredArea"
                    type="text"
                    size="large"
                    label="Preferred Area"
                    required
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={16}
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
                Update
              </Button>
            </div>
          </Form>
        </div>
      </Card>{" "}
      <ModalComponent
        title="Update Profile"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
          router.push(`/dashboard/tutor/${params.id}`);
        }}
        handleOk={async () => {
          try {
            const res = await tutorUpdate({
              id: Id,
              body: modalData,
            }).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
            } else {
              message.success("Profile updated successfully!!!");
              router.push(`/dashboard/tutor/${params.id}`);
            }
          } catch (error) {
            message.error("Something went wrong");
            router.push("/home");
          }
        }}
      >
        <p className="my-5">Do you want to update his profile?</p>
      </ModalComponent>
    </div>
  );
};

export default UpdateTutorByAdmin;
