import {
  useBookingCancelByAdminMutation,
  useProcessBookingMutation,
} from "@/redux/api/bookingApi";
import { Button, Card, Col, Row, message } from "antd";
import { useState } from "react";
import ModalComponent from "../ui/Modal";
import {
  useAcceptOwnRequestMutation,
  useCancelOwnRequestMutation,
} from "@/redux/api/tutorApi";

const TutorOffer = (data: any) => {
  const [cancel] = useCancelOwnRequestMutation(undefined);
  const [accept] = useAcceptOwnRequestMutation(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const acceptBooking = () => {
    setStatus("accepted");
    setOpen(true);
  };
  const cancelBooking = () => {
    setStatus("disapproved");
    setOpen(true);
  };
  return (
    <Card
      hoverable
      style={{
        width: 280,
        margin: "0 auto 0 auto",
        backgroundColor: "#f3f4de",
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        Conditions
      </h3>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Booking Status:</span>{" "}
        {data?.data?.status}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Start Date:</span>{" "}
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(data?.data?.teachingStartDate))}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Teaching Time:</span>{" "}
        {data?.data?.message?.teachingTime}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Salary:</span>{" "}
        {data?.data?.message?.maxSalary}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Weekly:</span>{" "}
        {data?.data?.message?.dayPerWeek} days
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
        {data?.data?.message?.location}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
        {data?.data?.message?.description}
      </p>
      {data?.data?.status == "processing" ? (
        <Row justify="space-between" style={{ marginTop: "20px" }}>
          <Col span={11}>
            <Button
              style={{
                backgroundColor: "#ffbdbd",
                color: "#b30707",
                fontWeight: "bold",
                width: "100%",
                padding: "0",
              }}
              onClick={cancelBooking}
            >
              <h5>Cancel</h5>
            </Button>
          </Col>
          <Col span={12}>
            <Button
              style={{
                backgroundColor: "#c3ffbd",
                color: "#07b318",
                fontWeight: "bold",
                width: "100%",
                padding: "0",
              }}
              onClick={acceptBooking}
            >
              Accept
            </Button>
          </Col>
        </Row>
      ) : (
        <p style={{ margin: "10px 0", fontWeight: "bold", color: "Green" }}>
          Wait for conforming from user. You will see this tuition in your
          history if it will be accepted.
        </p>
      )}
      <ModalComponent
        title="Tutor Booking"
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
        handleOk={async () => {
          try {
            let res;
            if (status == "disapproved") {
              res = await cancel(data?.data?.userId).unwrap();
            }
            if (status == "accepted") {
              res = await accept(data?.data?.userId).unwrap();
            }

            if (res.statusCode === 500) {
              message.error(res.message);
              setOpen(false);
            } else {
              setOpen(false);
              message.success(`Request is ${status}...`);
            }
          } catch (error) {
            message.error("Something went wrong");
            setOpen(false);
          }
        }}
      >
        <p className="my-5">Are you sure to {status} this offer?</p>
      </ModalComponent>
    </Card>
  );
};

export default TutorOffer;
