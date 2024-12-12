import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

  // Check if the current route is active
  const isActive = (path) => router.pathname === path;

  return (
    <div className="p-4 sticky top-0 flex justify-between items-center bg-primary text-center text-xl font-bold text-white shadow-lg">
      <Link href="/">
        <span
          className={`${
            isActive("/") ? "border-b-2 border-white" : ""
          } hover:border-b-2 hover:border-white p-2 transition duration-300 ease-in-out`}
        >
          Focus Mode
        </span>
      </Link>
      <Link href="/wallet">
        <span
          className={`${
            isActive("/wallet") ? "border-b-2 border-white" : ""
          } hover:border-b-2 hover:border-white p-2 transition duration-300 ease-in-out`}
        >
          Wallet
        </span>
      </Link>
    </div>
  );
};

export default Header;
