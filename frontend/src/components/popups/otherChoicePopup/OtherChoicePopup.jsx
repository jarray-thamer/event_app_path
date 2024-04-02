import img from "../featuredIcon.png";
import xclose from "../x-close.png";

const OtherChoicePopup = () => {
  return (
    <div className="fixed max-w-96 mx-4 rounded-xl bg-white items-center flex flex-col p-5 pb-10">
      <img src={img} className=" mb-3" width={"45px"} height={"44px"} />
      <img src={xclose} className="absolute right-5 cursor-pointer" />
      <h3
        className="text-center font-bold text-xl"
        style={{ color: "#101828" }}
      >
        Got another issue?
      </h3>
      <p
        style={{ color: "#2F2E41" }}
        className="text-center font-normal text-base "
      >
        Since your problem isn’t mentioned in the list, find a member of the
        Path Organization Team and go have a chat with them. They’ll help you.
      </p>
    </div>
  );
};

export default OtherChoicePopup;
