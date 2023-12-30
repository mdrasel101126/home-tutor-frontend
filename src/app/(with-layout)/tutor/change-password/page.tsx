"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ModalComponent from "@/components/ui/Modal";
import { useTutorChangePasswordMutation } from "@/redux/api/tutorApi";
import { passwordUpdateSchema } from "@/schemas/allValidationSchema";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassPage = () => {
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { role } = getUserInfo() as any;
  if (typeof window !== "undefined") {
    if (!isLoggedIn() || role !== "tutor") {
      router.push("/home");
    }
  }

  const [tutorUpdate] = useTutorChangePasswordMutation(undefined);

  const onSubmit = async (data: any) => {
    setOpen(true);
    setModalData(data);
  };

  return (
    <div
      style={{ padding: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Card bodyStyle={{ padding: "20px", overflow: "hidden" }}>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(passwordUpdateSchema)}
        >
          <h1
            style={{
              margin: "0 0 15px 0px",
              textAlign: "center",
            }}
          >
            Reset Password
          </h1>
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="oldPassword"
              label="Old password"
              type="password"
            />
          </div>
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="newPassword"
              label="New password"
              type="password"
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
      </Card>{" "}
      <ModalComponent
        title="Update Password"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
          router.push("/tutor/profile");
        }}
        handleOk={async () => {
          try {
            const res = await tutorUpdate(modalData).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              message.success("Password updated successfully!!!");
              setOpen(false);
            }
          } catch (error) {
            message.error("Something went wrong");
            router.push("/home");
          }
        }}
      >
        <p className="my-5">Do you want to update your password?</p>
      </ModalComponent>
    </div>
  );
};

export default ResetPassPage;
