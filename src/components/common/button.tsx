import React from "react";

const Button = ({ ...props }) => {
  return (
    <button
      type={props.type}
      className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-md px-6 py-3 text-center me-2 mb-2 "
      {...props}
    >
      {props?.text}
    </button>
  );
};

export default Button;
