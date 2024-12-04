import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div
      className="w-full flex justify-center flex-col items-center gap-8"
      style={{ height: "calc(100vh - 220px)" }}
    >
      <span className="text-4xl lg:text-8xl font-bold tracking-wide">
        Oops!
      </span>
      <span className="text-4xl lg:text-8xl font-bold tracking-wide font-sans">
        404-error
      </span>
      <span className="text-xl lg:text-2xl font-bold tracking-wide font-sans">
        Page not found
      </span>

      <Link href={"/"} className="py-4 px-20 lg:px-40 bg-blue-500 text-white">
        Go to home
      </Link>
    </div>
  );
};

export default NotFound;
