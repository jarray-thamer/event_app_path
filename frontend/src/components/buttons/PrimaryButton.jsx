/* eslint-disable react/prop-types */
const PrimaryButton = ({ content, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ backgroundColor: "#4B00FA", color: "white" }}
      className="cursor-pointer my-3 py-5 w-full rounded-lg self-center font-semibold hover:opacity-85"
    >
      {content}
    </button>
  );
};

export default PrimaryButton;
