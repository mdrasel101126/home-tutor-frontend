import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const items = (
    <>
      <li>
        <Link href="/processor">Processor</Link>
      </li>
      <li>
        <Link href="/motherboard">Motherboard</Link>
      </li>
      <li>
        <Link href="/ram">RAM</Link>
      </li>
      <li>
        <Link href="/power-supply">Power Supply Unit</Link>
      </li>
      <li>
        <Link href="/storage-device">Storage Device</Link>
      </li>
      <li>
        <Link href="/monitor">Monitor</Link>
      </li>
      <li>
        <Link href="/others">Others</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-white">
          PCBUILDER
        </Link>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
