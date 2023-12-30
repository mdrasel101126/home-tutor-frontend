import UserRegistration from "@/components/LoginAndRegistration/UserRegistration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | User Registration",
};

const Login = () => {
  return (
    <div style={{ maxWidth:"1400px",
    margin:"0 auto"}}>
      <UserRegistration />
    </div>
  );
};

export default Login;
