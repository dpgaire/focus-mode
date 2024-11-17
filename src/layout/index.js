import { Footer, Header } from "@/components";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      <Header />
      <div className="p-4 my-2 h-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
