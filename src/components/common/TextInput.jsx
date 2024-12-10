import React from "react";
import { TextInputError } from ".";

const TextInput = ({
  type = "text",
  value,
  onChange,
  placeholder = "Enter text",
  name,
  error = "",
  className = "",
}) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        className={`py-2 px-4 w-full border text-gray-600 rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <TextInputError errorMessage={error} />}
    </div>
  );
};

export default TextInput;
