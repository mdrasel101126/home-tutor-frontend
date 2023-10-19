import Link from "next/link";
import RootLayout from "./RootLayout";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex flex-row items-baseline">
      <div className="w-52">
        <Link href="/dashboard/add-tutor" className="btn btn-primary w-48">
          Add Tutor
        </Link>
        <Link href="/dashboard/users" className="btn btn-primary w-48">
          All Users
        </Link>
        <Link href="/dashboard/bookings" className="btn btn-primary w-48">
          My Bookings
        </Link>
        <Link href="" className="btn btn-primary w-48">
          Add Tutor
        </Link>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
