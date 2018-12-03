import React from "react";

export const FormInput = ({ name, value, placeholder, type, onChange }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

FormInput.defaultProps = {
  type: "text"
};

export const FormTextarea = ({ name, value, placeholder, onChange }) => {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
