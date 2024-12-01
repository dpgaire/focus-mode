import React from "react";

const Button = ({ variant, innerText, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`lg:max-w-48 w-full px-4 py-2 text-white rounded-lg ${
        variant === "primary" ? "bg-blue-500" : "bg-red-500"
      }`}
    >
      {innerText ? innerText : "Button"}
    </button>
  );
};

export default Button;
