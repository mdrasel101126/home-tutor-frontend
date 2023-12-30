"use client";
import AdminAllRequestBookings from "@/components/Bookings/AllRequestBooking";
import { useRequestedBookingQuery } from "@/redux/api/bookingApi";
import { Card, Empty, Row } from "antd";

const RequestBooking = () => {
  const { data, isLoading } = useRequestedBookingQuery(undefined);
  return (
    <Card bodyStyle={{ overflow: "hidden", minHeight: "100vh" }}>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          margin: "10px 0",
          backgroundColor: "white",
        }}
      >
        Booking Request
      </h4>
      <Row
        justify="space-between"
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "20px",
        }}
        align="middle"
        gutter={[10, 24]}
      >
        {data?.data.length !== 0 ? (
          data?.data?.map((booking: any, index: number) => (
            <>
              <AdminAllRequestBookings data={booking} key={index} />
            </>
          ))
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "50px auto" }}
          />
        )}
      </Row>
    </Card>
  );
};

export default RequestBooking;
