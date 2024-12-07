import React from "react";

const Button = ({ variant, innerText, type, onClick }) => {
  const getButtonClass = () => {
    if (variant === "primary") {
      return "bg-primary text-white";
    } else if (variant === "outline") {
      return "bg-secondary text-gray-500";
    } else {
      return "bg-danger text-white";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`lg:max-w-52 w-full px-4 py-2 rounded-lg ${getButtonClass()}`}
    >
      {innerText ? innerText : "Button"}
    </button>
  );
};

export default Button;
