/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import OtherChoicePopup from "../components/popups/otherChoicePopup/OtherChoicePopup";
import DefaultInput from "../components/inputs/default/DefaultInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const SurveyPage = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [choice, setChoice] = useState("");
  const clerkUserId = useAuth().userId;
  const { userId } = useAuth();
  const [behanceLink, setBehanceLink] = useState("");
  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };
  const handleChange = (e) => {
    setBehanceLink(e.target.value);
  };
  const handleSubmit = async () => {
    if (choice === "other") {
      setShowPopup(true);
      setChoice("");
    } else {
      const response = await axios.put("/survey", {
        id: clerkUserId,
        choice: choice,
        behanceLink: behanceLink,
      });

      if (response) {
        navigate(`/path/${clerkUserId}`);
      }
    }
  };

  useEffect(() => {
    const fetchEffect = async () => {
      console.log(userId);
      if (userId === null) {
        navigate("/login");
      }
      if (userId) {
        console.log("effect if", userId);
        const res = await axios.get(`/check/${userId}`);

        if (res.data.message === "User does not exist" || userId === null) {
          navigate("/login");
        } else if (res.data.data) {
          console.log("user exist");
          if (res.data.data.role === "admin") {
            navigate(`/admin/${userId}`);
          } else {
            console.log("user");
            if (res.data.data.on_boarding === 0) {
              navigate("/on-boarding");
            } else if (res.data.data.path === "") {
              console.log("send to survey");
            } else {
              navigate(`/path/${userId}`);
            }
          }
        }
      }
    };

    fetchEffect();
  });

  return (
    <div
      className={
        "relative flex mx-auto w-full h-full p-5 " +
        (showPopup ? "overflow-hidden" : "overflow-x-hidden")
      }
    >
      {showPopup && (
        <div
          onClick={toggleShowPopup}
          className=" cursor-pointer flex justify-center top-0 left-0 fixed bg-black bg-opacity-80 w-full h-full "
        >
          <div className=" cursor-default flex justify-center opacity-100 fixed top-1/3">
            <OtherChoicePopup />
          </div>
        </div>
      )}
      {
        <div className="flex flex-col mx-auto justify-between">
          <div>
            <h1
              className="font-bold text-left text-3xl leading-10"
              style={{ color: "#1E232C" }}
            >
              I struggle with freelancing because:
            </h1>
            {/* choices container */}
            <div className="flex flex-col my-9 ">
              {/* Portfolio */}
              <ul className="">
                <li className="my-4">
                  <input
                    type="radio"
                    id="portfolio"
                    name="choice"
                    value="portfolio"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="portfolio"
                    onClick={() => setChoice("portfolio")}
                    className="inline-flex border border-solid border-borderSurvey  text-notchecked items-center justify-between w-full p-5 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-checked peer-checked:border-none"
                  >
                    <div className="block">
                      <p className="w-full text-lg font-semibold">
                        I don't know how to create my portfolio
                      </p>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z"
                        fill="white"
                      />
                    </svg>
                  </label>
                </li>
                {/* Price */}
                <li className="my-4">
                  <input
                    type="radio"
                    id="price"
                    name="choice"
                    value="price"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="price"
                    onClick={() => setChoice("price")}
                    className="inline-flex border border-solid border-borderSurvey text-notchecked items-center justify-between w-full p-5 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-checked peer-checked:border-none"
                  >
                    <div className="block">
                      <p className="w-full text-lg font-semibold">
                        I don't know how to price my work
                      </p>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z"
                        fill="white"
                      />
                    </svg>
                  </label>
                </li>
                {/* client */}
                <li className="my-4">
                  <input
                    type="radio"
                    id="client"
                    name="choice"
                    value="client"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="client"
                    onClick={() => setChoice("client")}
                    className="inline-flex border border-solid border-borderSurvey text-notchecked items-center justify-between w-full p-5 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-checked peer-checked:border-none"
                  >
                    <div className="block">
                      <p className="w-full text-lg font-semibold">
                        I struggle to attract new clients
                      </p>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z"
                        fill="white"
                      />
                    </svg>
                  </label>
                </li>
                {/* payment */}
                <li className="my-4">
                  <input
                    type="radio"
                    id="payment"
                    name="choice"
                    value="payment"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="payment"
                    onClick={() => setChoice("payment")}
                    className="inline-flex border border-solid border-borderSurvey text-notchecked items-center justify-between w-full p-5 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-checked peer-checked:border-none"
                  >
                    <div className="block">
                      <p className="w-full text-lg font-semibold">
                        I'm unsure about receiving payments globally
                      </p>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z"
                        fill="white"
                      />
                    </svg>
                  </label>
                </li>
                {/* other */}
                <li>
                  <input
                    type="radio"
                    id="other"
                    name="choice"
                    value="other"
                    className="hidden peer"
                    required
                    checked={choice === "other" ? true : false}
                  />
                  <label
                    htmlFor="other"
                    onClick={() => setChoice("other")}
                    className="inline-flex border border-solid border-borderSurvey text-notchecked items-center justify-between w-full p-5 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-checked peer-checked:border-none"
                  >
                    <div className="block">
                      <p className="w-full text-lg font-semibold">
                        Other issue
                      </p>
                    </div>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.25C6.62391 2.25 2.25 6.62391 2.25 12C2.25 17.3761 6.62391 21.75 12 21.75C17.3761 21.75 21.75 17.3761 21.75 12C21.75 6.62391 17.3761 2.25 12 2.25ZM17.0742 8.73234L10.7742 16.2323C10.7051 16.3147 10.6191 16.3812 10.5221 16.4273C10.425 16.4735 10.3192 16.4983 10.2117 16.5H10.1991C10.0939 16.5 9.99 16.4778 9.89398 16.435C9.79797 16.3922 9.71202 16.3297 9.64172 16.2516L6.94172 13.2516C6.87315 13.1788 6.81981 13.0931 6.78483 12.9995C6.74986 12.9059 6.73395 12.8062 6.73805 12.7063C6.74215 12.6064 6.76617 12.5084 6.8087 12.4179C6.85124 12.3275 6.91142 12.2464 6.98572 12.1796C7.06002 12.1127 7.14694 12.0614 7.24136 12.0286C7.33579 11.9958 7.43581 11.9822 7.53556 11.9886C7.63531 11.995 7.73277 12.0213 7.82222 12.0659C7.91166 12.1106 7.99128 12.1726 8.05641 12.2484L10.1794 14.6072L15.9258 7.76766C16.0547 7.61863 16.237 7.52631 16.4335 7.51066C16.6299 7.49501 16.8246 7.55728 16.9754 7.68402C17.1263 7.81075 17.2212 7.99176 17.2397 8.18793C17.2582 8.3841 17.1988 8.57966 17.0742 8.73234Z"
                        fill="white"
                      />
                    </svg>
                  </label>
                </li>
              </ul>
            </div>
            <h4
              style={{ color: "#1E232C" }}
              className=" mt-5 font-bold text-base"
            >
              Please add your behance portfolio link
            </h4>

            {!showPopup && (
              <DefaultInput
                type="text"
                onChange={handleChange}
                name="behanceLink"
                value={behanceLink}
                placeholder="Ex: behance.net/path4freelancers"
              />
            )}
          </div>

          <PrimaryButton onClick={handleSubmit} content={"Show Path"} />
        </div>
      }
    </div>
  );
};

export default SurveyPage;
