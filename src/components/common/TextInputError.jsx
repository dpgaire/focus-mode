import React from "react";

export const TextInputError = ({ errorMessage }) => {
  return <div className="text-red-500 text-sm mt-1">{errorMessage}</div>;
};
