import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="p-4 flex justify-center items-center flex-col gap-2 text-sm bg-primary text-white">
      <span>Developed by Durga Gairhe</span>
      <div className="flex items-center gap-2 text-xl">
        <Link href={"https://github.com/dpgaire"} target="_blank">
          <FaGithub />
        </Link>
        <Link
          href={"https://www.linkedin.com/in/durga-gairhe/"}
          target="_blank"
        >
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
