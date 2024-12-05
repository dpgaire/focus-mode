import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto border">
      <Header />
      <div className="p-4 my-2 h-auto ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
