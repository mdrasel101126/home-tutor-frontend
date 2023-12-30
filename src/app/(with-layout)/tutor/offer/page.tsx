"use client";
import TutorOffer from "@/components/Bookings/TutorOffer";
import { useTutorOwnProfileQuery } from "@/redux/api/tutorApi";
import { Card, Empty, Row } from "antd";

const AllBooking = () => {
  const { data, isLoading } = useTutorOwnProfileQuery();
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
        My Offer
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
        {data?.data?.notification?.length !== 0 ? (
          data?.data?.notification?.map((booking: any, index: number) => (
            <>
              <TutorOffer data={booking} key={index} />
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

export default AllBooking;
