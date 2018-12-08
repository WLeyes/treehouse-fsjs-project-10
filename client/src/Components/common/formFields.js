import React from "react";
import PropTypes from "prop-types";

export const FormInput = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  error,
  disabled
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="validation--errors--label">{error}</div>}
    </div>
  );
};

FormInput.defaultProps = {
  type: "text"
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export const FormTextarea = ({
  name,
  value,
  placeholder,
  onChange,
  error,
  disabled
}) => {
  return (
    <div>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="validation--errors--label">{error}</div>}
    </div>
  );
};

FormTextarea.defaultProps = {
  type: "text"
};

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};
