import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/profileImage.png";
import Image from "next/image";
import { removeUser } from "@/redux/features/user/userSlice";

const Navbar = () => {
  const { email, promfileImg } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("homeTutor");
    dispatch(removeUser());
  };
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-white">
          HomeTutor
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        {email ? (
          <>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-20 rounded-full">
                <Image
                  src={promfileImg ? promfileImg : profileImg}
                  width={20}
                  height={20}
                  alt="person"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          </>
        ) : (
          <Link href="/login" className="text-white font-bold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
