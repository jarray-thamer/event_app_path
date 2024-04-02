import { Link } from "react-router-dom";
import congrats from "../congrats.png";
import xclose from "../x-close.png";

const CongratsPopup = () => {
  return (
    <div className="fixed max-w-96 mx-4 rounded-xl bg-white items-center flex flex-col p-4">
      <img src={congrats} className=" mb-3" width={"113px"} height={"113px"} />
      <img src={xclose} className="absolute right-5 cursor-pointer" />
      <h3
        className="text-center font-bold text-xl mb-2"
        style={{ color: "#101828" }}
      >
        Congratulations Freelancer!
      </h3>
      <p
        style={{ color: "#2F2E41" }}
        className="text-center font-normal text-base"
      >
        You will be redirected to the Resources page where you’ll find templates
        and relevant info for your freelance journey. 
        <br />
        <span className=" font-semibold">
          Glad to be your companion on your journey today!
        </span>
      </p>
      <Link
        className="text-white no-underline w-full"
        to={"https://event.path-pioneer.com"}
      >
        <button
          type="submit"
          style={{ backgroundColor: "#022F5E", color: "white" }}
          className="cursor-pointer mt-6 py-3 w-full rounded-lg self-center font-semibold hover:opacity-85"
        >
          Ok
        </button>
      </Link>
    </div>
  );
};

export default CongratsPopup;
