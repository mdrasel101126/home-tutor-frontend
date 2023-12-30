import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Dropdown, MenuProps, Row, message } from "antd";
import ModalComponent from "../ui/Modal";
import { useState } from "react";
import Link from "next/link";
import {
  useBookingCancelByAdminMutation,
  useProcessBookingMutation,
} from "@/redux/api/bookingApi";

const AdminAllRequestBookings = (data: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [cancel] = useBookingCancelByAdminMutation(undefined);
  const [process] = useProcessBookingMutation(undefined);

  const processBooking = () => {
    setStatus("processing");
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
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
        {data?.data?.userId?.fullName}
      </p>
      <p style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Phone:</span>{" "}
        {data?.data?.userId?.phoneNumber}
      </p>
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
        <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
        {data?.data?.message?.location}
      </p>
      <Row justify="space-between">
        <Col span={11}>
          <Link href={`/dashboard/all-user`}>
            <Button
              style={{
                backgroundColor: "#ffbdbd",
                color: "#b30707",
                fontWeight: "bold",
                width: "100%",
                padding: "0",
              }}
            >
              <h5>User</h5>
            </Button>
          </Link>
        </Col>
        <Col span={12}>
          <Link href={`/dashboard/tutor/${data?.data?.tutorId?._id}`}>
            <Button
              style={{
                backgroundColor: "#c3ffbd",
                color: "#07b318",
                fontWeight: "bold",
                width: "100%",
                padding: "0",
              }}
            >
              Tutor
            </Button>
          </Link>
        </Col>
      </Row>
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
            <h5>Disapproved</h5>
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
            onClick={processBooking}
          >
            Process
          </Button>
        </Col>
      </Row>
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
              res = await cancel(data?.data?._id).unwrap();
            }
            if (status == "processing") {
              res = await process(data?.data?._id).unwrap();
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
          }
        }}
      >
        <p className="my-5">Are you sure to {status} this request?</p>
      </ModalComponent>
    </Card>
  );
};

export default AdminAllRequestBookings;
