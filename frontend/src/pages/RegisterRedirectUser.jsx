/* eslint-disable no-unused-vars */
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectUser = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEffect = async () => {
      if (userId) {
        const res = await axios.get(`/check/${userId}`);

        if (res.data.message === "User does not exist") {
          const UserInfo = {
            clerk_id: user.id,
            email: user.emailAddresses[0].emailAddress,
            fullName: user.fullName,
          };

          const data = await axios.post("/register", UserInfo);
          if (data.data.data) {
            navigate("/on-boarding");
          }
        } else if (res.data.data) {
          if (res.data.data.role === "admin") {
            navigate(`/admin/${userId}`);
          } else {
            console.log("user");
            if (res.data.data.on_boarding === 0) {
              navigate("/on-boarding");
            } else if (res.data.data.path === "") {
              navigate("/survey");
            } else {
              navigate(`/path/${userId}`);
            }
          }
        }
      }
    };

    fetchEffect();
  });

  return <></>;
};

export default RedirectUser;
