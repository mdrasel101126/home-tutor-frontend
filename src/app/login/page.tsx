import LoginPage from "@/components/LoginAndRegistration/UserLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Tutor | User Login"
};

const Login = () => {
  return (
    <div style={{ maxWidth:"1400px",
    margin:"0 auto"}}>
      <LoginPage />
    </div>
  );
};

export default Login;
