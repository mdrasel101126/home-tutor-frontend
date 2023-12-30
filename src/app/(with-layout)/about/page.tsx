import React from "react";
import { Card } from "antd";
const About = () => {
  return (
    <div>
      <Card bordered={true} style={{ padding: "20px", margin: "20px" }}>
        <div>
          <h1 style={{ marginTop: "20px", textAlign: "center",color:"#3b82f6" }}>
            Rasel Miah
          </h1>
          <h2 style={{ margin: "5px", textAlign: "center" }}>
            Fullstack developer
          </h2>
          <Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
                width: "100%",
                marginLeft: "auto",
              }}
            >
              <h3 style={{ marginLeft: "auto", marginRight: "auto" }}>
                Email:
              </h3>
              <a
                href="mailto:rasel.miah101126@gmail.com"
                target="_blank"
                style={{ color: "black" }}
              >
                rasel.miah101126@gmail.com
              </a>
              <h3 style={{ marginLeft: "auto", marginRight: "auto" }}>
                Contact:
              </h3>
              <a
                href="tel:+8801798686728"
                target="_blank"
                style={{ color: "black" }}
              >
                +8801798686728
              </a>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default About;
