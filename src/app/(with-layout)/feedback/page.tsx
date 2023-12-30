"use client";
import Form from "@/components/Forms/Form";
import FormTextArea from "@/components/Forms/FormTextArea";
import ModalComponent from "@/components/ui/Modal";
import {
  useGetFeedbacksQuery,
  usePostFeedbackMutation,
} from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schemas/allValidationSchema";
import { isLoggedIn } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Empty, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cart = () => {
  const { data, isLoading } = useGetFeedbacksQuery({ page: 1, limit: 100 });
  const [postFeedback] = usePostFeedbackMutation(undefined);

  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const onSubmit = async (data: any) => {
    if (!isLoggedIn()) {
      message.error("Please login to post your feedback...");
      router.push("/login");
      return;
    }
    setOpen(true);
    setModalData(data);
  };
  return (
    <Card
      bodyStyle={{ padding: "20px", overflow: "hidden", minHeight: "100vh" }}
      style={{ margin: "0 30px" }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "10px 0",
          backgroundColor: "white",
        }}
      >
        All Feedback
      </h4>
      <Row
        justify="space-evenly"
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "20px",
        }}
        align="middle"
        gutter={[10, 10]}
      >
        {data?.data?.data?.length ? (
          data?.data?.data?.map((singleFeedback: any, index: number) => (
            <Col key={index} lg={6} style={{ width: 280 }}>
              <Card
                hoverable
                style={{
                  margin: "0 5px",
                  backgroundColor: "#f3f4de",
                }}
              >
                <p style={{ margin: "10px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                  {singleFeedback.name}
                </p>
                <p style={{ margin: "10px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                  {singleFeedback.role}
                </p>
                <p style={{ margin: "10px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Feedback:</span>{" "}
                  {singleFeedback.feedback}
                </p>
              </Card>
            </Col>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "50px auto" }}
          />
        )}
      </Row>

      <div
        style={{
          padding: "50px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card bodyStyle={{ padding: "0 20px", overflow: "hidden" }}>
          <Form submitHandler={onSubmit} resolver={yupResolver(feedbackSchema)}>
            <h3
              style={{
                margin: "0 0 15px 0px",
                textAlign: "center",
                padding: "10px 0 0 0",
              }}
            >
              Your Feedback
            </h3>
            <div style={{ margin: "5px 0" }}>
              <FormTextArea name="feedback" label="Feedback" />
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
      <ModalComponent
        title="Feedback"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            const res = await postFeedback(modalData).unwrap();
            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              message.success("Thanks for your feedback!!!");
              setOpen(false);
            }
          } catch (error) {
            message.error("Something went wrong");
          }
        }}
      >
        <p className="my-5">Are you sure to post your feedback?</p>
      </ModalComponent>
    </Card>
  );
};

export default Cart;
