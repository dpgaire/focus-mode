import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex-center p-4 flex-col gap-2 text-sm bg-primary text-white">
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
      <span className="text-xs">Developed by Durga Gairhe</span>
    </div>
  );
};

export default Footer;
