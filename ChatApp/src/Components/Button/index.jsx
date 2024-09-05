import React from "react";

const Button = ({
  label = "",
  type = "button",
  className = "",
  disabled = false
}) => {
  return (
    <div className="w-full flex justify-center">
      <button
        type={type}
        className={`bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-2 px-4 border border-transparent ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
