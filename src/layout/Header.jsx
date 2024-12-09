import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="p-4 flex justify-between bg-primary text-center text-xl font-bold text-white">
      <Link href="/">Focus Mode</Link>
      <Link href="/expense-tracker">Expenses</Link>
    </div>
  );
};

export default Header;
