import React from "react";
import welcomeImg from "../../../assets/Welcome.png";
import CollegeTeacher from "../../../assets/CollegeTeacher.png";
import IeltsTeacher from "../../../assets/IeltsTeacher.png";
import SchoolTeacher from "../../../assets/SchoolTeacher.png";
import Image from "next/image";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import AllTutors from "@/components/Tutors/Tutors";
import Feedback from "@/components/Feedback/Feedback";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor",
};

const Home = () => {
  return (
    <div>
      <h1
        style={{
          fontSize: "40px",
          textAlign: "center",
          fontWeight: "bold",
          color:"#3b82f6",
          marginTop:"32px",
          fontFamily:"monospace"
        }}
      >
        Welcome to Home Tutor
      </h1>
      <h4
        style={{
          textAlign: "center",
        }}
      >
        We Provide best quality tutor and tuition in your area
      </h4>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          padding: "5px 0",
          fontWeight: "bolder",
          margin: "20px 0 10px",
          color:"#3b82f6"
        }}
      >
        Our Services
      </h4>
      <Row
        justify="center"
        align="middle"
        gutter={20}

      >
        <Col xs={15} sm={10} lg={8}>
          <Card
            hoverable
            style={{ width:"100%",margin:"20px 0" }}
            cover={
              <Image
                alt="SchoolTeacher"
                src={SchoolTeacher}
                width={200}
                height={200}
              />
            }
          >
            <Meta
              title="School Teacher"
              description="See our best School teacher for your children. Our tutors will take great care to make your child a successful person."
            />
            <Link href="/all-tutor?preferClass=1-10">
              <Button
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <h5>See All</h5>
              </Button>
            </Link>
          </Card>
        </Col>
        <Col xs={15} sm={10} lg={8}>
          <Card
            hoverable
            style={{ width: "100%",margin:"20px 0"}}
            cover={
              <Image
                alt="CollegeTeacher"
                src={CollegeTeacher}
                width={200}
                height={200}
              />
            }
          >
            <Meta
              title="College Teacher"
              description="Experienced and best qualities of college teacher from wellknown universities. Quickly find a best tutor for you."
            />{" "}
            <Link href="/all-tutor?preferClass=11-12">
              <Button
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <h5>See All</h5>
              </Button>
            </Link>{" "}
          </Card>
        </Col>
        <Col xs={15} sm={10} lg={8}>
          <Card
            hoverable
            style={{ width: "100%",margin:"20px 0" }}
            cover={
              <Image
                alt="IeltsTeacher"
                src={IeltsTeacher}
                width={200}
                height={200}
              />
            }
          >
            <Meta
              title="IELTS Teacher"
              description="Finding Experienced teacher or new to teaching IELTS, our tutor will help you guide through the IELTS test."
            />
            <Link href="/all-tutor?preferClass=IELTS">
              <Button
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <h5>See All</h5>
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          padding: "5px 0",
          fontWeight: "bolder",
          margin: "20px 0 10px",
          color:"#3b82f6"
          
        }}
      >
        Our Tutors
      </h4>
      <AllTutors />
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          padding: "5px 0",
          fontWeight: "bold",
          margin: "20px 0 10px",
          color:"#3b82f6"
        }}
      >
        Feedback
      </h4>
      <Feedback />
    </div>
  );
};

export default Home;
