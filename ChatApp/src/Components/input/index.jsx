import React from "react";

function Input({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  isRequired = false,
  className = "",
  value = "",
  onChange = () => {}
}) {
  return (
    <div className="w-full max-w-xs mx-auto ">
      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        className={`block w-full border border-gray-300 bg-gray-100 rounded-lg p-2 text-sm ${className}`}
        type={type}
        id={name}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
