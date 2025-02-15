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
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

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
          color: "#3b82f6",
          marginTop: "32px",
          fontFamily: "monospace",
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
          color: "#3b82f6",
        }}
      >
        Our Services
      </h4>
      <Row
        justify="center"
        align="middle"
        gutter={10}
      >
        <Card
          hoverable
          style={{ width: "100%", maxWidth: 300, margin: "20px auto" }}
          cover={
            <div style={{ position: "relative", height: 200 }}>
              <Image
                alt="School Teacher"
                src={SchoolTeacher}
                layout="fill"
                className="w-full object-contain"
              />
            </div>
          }
          bodyStyle={{ padding: 20 }}
        >
          <Meta
            title={
              <Title
                level={3}
                style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                School Teacher
              </Title>
            }
            description={
              <Paragraph>
                See our best School teachers for your children. Our tutors will
                take great care to make your child a successful person.
              </Paragraph>
            }
          />
          <Link
            href="/all-tutor?preferClass=1-10"
            passHref
          >
            <Button
              type="primary"
              block
              size="large"
              style={{
                marginTop: 20,
                height: "auto",
                padding: "10px 0",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              See All Teachers
            </Button>
          </Link>
        </Card>
        <Card
          hoverable
          style={{ width: "100%", maxWidth: 300, margin: "20px auto" }}
          cover={
            <div style={{ position: "relative", height: 200 }}>
              <Image
                alt="Colleg Teacher"
                src={CollegeTeacher}
                layout="fill"
                className="w-full object-contain"
              />
            </div>
          }
          bodyStyle={{ padding: 20 }}
        >
          <Meta
            title={
              <Title
                level={3}
                style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                College Teacher
              </Title>
            }
            description={
              <Paragraph>
                Experienced and best qualities of college teacher from wellknown
                universities. Quickly find a best tutor for you.
              </Paragraph>
            }
          />
          <Link
            href="/all-tutor?preferClass=1-10"
            passHref
          >
            <Button
              type="primary"
              block
              size="large"
              style={{
                marginTop: 20,
                height: "auto",
                padding: "10px 0",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              See All Teachers
            </Button>
          </Link>
        </Card>
        <Card
          hoverable
          style={{ width: "100%", maxWidth: 300, margin: "20px auto" }}
          cover={
            <div style={{ position: "relative", height: 200 }}>
              <Image
                alt="IELTS Teacher"
                src={IeltsTeacher}
                layout="fill"
                className="w-full object-contain"
              />
            </div>
          }
          bodyStyle={{ padding: 20 }}
        >
          <Meta
            title={
              <Title
                level={3}
                style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                IELTS Teacher
              </Title>
            }
            description={
              <Paragraph>
                Finding Experienced teacher or new to teaching IELTS, our tutor
                will help you guide through the IELTS test.
              </Paragraph>
            }
          />
          <Link
            href="/all-tutor?preferClass=1-10"
            passHref
          >
            <Button
              type="primary"
              block
              size="large"
              style={{
                marginTop: 20,
                height: "auto",
                padding: "10px 0",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              See All Teachers
            </Button>
          </Link>
        </Card>
      </Row>
      <h4
        style={{
          textAlign: "center",
          fontSize: "30px",
          padding: "5px 0",
          fontWeight: "bolder",
          margin: "20px 0 10px",
          color: "#3b82f6",
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
          color: "#3b82f6",
        }}
      >
        Feedback
      </h4>
      <Feedback />
    </div>
  );
};

export default Home;
