/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CongratsPopup from "../components/popups/congratsPopup/CongratsPopup";
import useSWR from "swr";

import { useAuth } from "@clerk/clerk-react";
import CompletePath from "../components/CompletePath/CompletePath";
const PathPage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const userId = params.id;
  const [showPopup, setShowPopup] = useState(false);
  const [congrats, setCongrats] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userPath, setUserPath] = useState([]);
  const clerkUserID = useAuth().userId;

  // <----- Fetch SWR ------->
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => {
      console.log("fetch swr");
      if (clerkUserID === null) {
        navigate("/login");
      }
      const data = await res.json();
      if (data.data.role === "admin") {
        navigate("/admin");
      }
      setUserInfo(data.data);
      setPath(data.data.path);

      return data;
    });

  useSWR(`http://localhost:5555/get-user-by-id/${userId}`, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (!congrats) {
      if (userInfo) {
        if (userInfo.current_stand >= 4) {
          console.log("congrats");
          setShowPopup(true);
          setCongrats(true);
        }
      }
    }
  });

  // <----- Capitalize Full Name ----->
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // <----- Toggle show popup----->
  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  // <----- Set Path ----->
  const setPath = (UserChoice) => {
    if (UserChoice == "payment") {
      setUserPath(["Payment", "Portfolio", "Client", "Project Mastery Zone"]);
    }
    if (UserChoice == "price") {
      setUserPath(["Payment", "Client", "Portfolio", "Project Mastery Zone"]);
    }
    if (UserChoice == "portfolio") {
      setUserPath(["Portfolio", "Client", "Payment", "Project Mastery Zone"]);
    }
    if (UserChoice == "client") {
      setUserPath(["Client", "Portfolio", "Payment", "Project Mastery Zone"]);
    }
  };

  return (
    userInfo && (
      <div
        className={
          "relative flex flex-col mx-auto w-screen h-screen p-5 max-w-96 top-0 right-0" +
          (showPopup ? "overflow-hidden" : "")
        }
      >
        {showPopup && (
          <div
            onClick={toggleShowPopup}
            className="z-40 cursor-pointer overflow-hidden flex justify-center top-0 left-0 fixed bg-black bg-opacity-80 w-screen h-screen "
          >
            <div className=" cursor-default flex justify-center opacity-100 fixed top-1/4">
              <CongratsPopup />
            </div>
          </div>
        )}
        <div className="0 mb-2 flex flex-col items-start max-w-96">
          <h1
            className="max-w-96 text-lg font-bold"
            style={{ color: "#1F2429" }}
          >
            {Capitalize(userInfo.full_name)}
          </h1>
          <h5 className="text-base opacity-70 font-medium">
            ID: {userInfo.id}
          </h5>
        </div>
        {/* Path container */}
        <div className="flex w-full h-full">
          <CompletePath userInfo={userInfo} userPath={userPath} />
        </div>
        {/* </div> */}
        <div className="mt-10">
          <p className=" text-center text-xs" style={{ color: "#929292" }}>
            Powered by Path
          </p>
        </div>
      </div>
    )
  );
};

export default PathPage;
