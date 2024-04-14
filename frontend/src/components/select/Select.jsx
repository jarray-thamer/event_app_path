const Select = ({ SetSearch }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          SetSearch(e.target.value);
        }}
        className=" w-full p-2 rounded-lg mx-2 text-center"
        style={{
          backgroundColor: "#f7f8f9",
          border: "1px solid #e8ecf4",
          padding: "8px 18px",
          margin: "15px 15px 0px 0px",
        }}
      >
        <option value="">All</option>
        <option value="payment">Payment</option>
        <option value="client">Client</option>
        <option value="portfolio">Portfolio</option>
        <option value="pmz">PMZ</option>
      </select>
    </div>
  );
};
export default Select;
