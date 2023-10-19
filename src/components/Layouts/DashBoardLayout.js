import Link from "next/link";
import RootLayout from "./RootLayout";
import { useSelector } from "react-redux";

const DashBoardLayout = ({ children }) => {
  const { email, role } = useSelector((state) => state.user);
  return (
    <div className="flex flex-row items-baseline">
      <div className="w-52">
        {(role === "super_admin" || role === "admin") && (
          <>
            <Link
              href="/dashboard/add-tutor"
              className="btn btn-primary w-48 m-2"
            >
              Add Tutor
            </Link>
            <Link href="/dashboard/users" className="btn btn-primary w-48 m-2">
              All Users
            </Link>
          </>
        )}
        {role === "user" && (
          <>
            <Link
              href="/dashboard/bookings"
              className="btn btn-primary w-48 m-2"
            >
              My Bookings
            </Link>
          </>
        )}
      </div>
      <div className="w-full my-8">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
