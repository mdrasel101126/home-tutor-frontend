"use client";
import { Button, Card, Col, Row, message } from "antd";
import React, { useState } from "react";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useRouter } from "next/navigation";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { SubmitHandler } from "react-hook-form";

import ModalComponent from "@/components/ui/Modal";
import {
  useGetSingleUserQuery,
  useUpdateUserByAdminMutation,
} from "@/redux/api/userApi";

const UpdateUserByAdmin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { role } = getUserInfo() as any;
  if (typeof window !== "undefined") {
    if (!isLoggedIn() || role == "admin_tutor") {
      router.push("/home");
    }
  }
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState({});

  const { data } = useGetSingleUserQuery(params.id);

  const [userUpdate] = useUpdateUserByAdminMutation(undefined);

  const onSubmit: SubmitHandler<any> = async (submitData: any) => {
    const updatedData = {
      fullName: submitData.fullName,
      phoneNumber: submitData.phoneNumber,
    };
    if (updatedData.phoneNumber == data?.data?.phoneNumber) {
      delete updatedData.phoneNumber;
    }
    setOpen(true);
    setModalData({ id: params.id, data: updatedData });
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
          Update User Profile
        </h1>

        <Form submitHandler={onSubmit} defaultValues={data?.data}>
          <Row justify="center" align="middle">
            <Col sm={12} md={8} lg={8}>
              <div style={{ margin: "0 20px" }}>
                <div>
                  <FormInput
                    name="fullName"
                    type="text"
                    size="large"
                    label="Full Name"
                    required
                  />
                </div>
                <div>
                  <FormInput
                    name="phoneNumber"
                    type="text"
                    size="large"
                    label="Phone Number"
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
              Update
            </Button>
          </div>
        </Form>
      </Card>{" "}
      <ModalComponent
        title="Update Profile"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            const res = await userUpdate(modalData).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              message.success("Profile updated successfully!!!");
              router.push("/dashboard/all-user");
            }
          } catch (error) {
            message.error("Something went wrong");
            router.push("/home");
          }
        }}
      >
        <p className="my-5">
          Do you want to update {data?.data?.fullName} profile?
        </p>
      </ModalComponent>
    </div>
  );
};
export default UpdateUserByAdmin;
