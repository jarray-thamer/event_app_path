import "../Inputs.css";

const DefaultInput = ({ icon, placeholder, label, ...otherProps }) => {
  return (
    <div className="group">
      <input placeholder={placeholder} className="form-input" {...otherProps} />
    </div>
  );
};

export default DefaultInput;
