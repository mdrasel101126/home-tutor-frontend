"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import { Button, Card } from "antd";
const NotFound = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 5000);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          backgroundColor: "#f3f4de",
          color: "#b3a562",
          paddingTop: "50px",
        }}
      >
        <h1>Page is not found.</h1>
        <Link href="/home">
          <Button
            style={{
              backgroundColor: "#fffbbd",
              color: "#b3a562",
              fontWeight: "bolder",
              margin: "50px",
            }}
          >
            Go to home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
