/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const IndexPage = () => {
  // <-------- Check isLoggedIn -------->
  const navigate = useNavigate();
  const isSignedIn = useUser();
  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
    const checkLogin = async () => {
      try {
        const dataSession = sessionStorage.getItem("userInfo");
        if (dataSession) {
          const dataSessionObject = JSON.parse(dataSession);
          if (dataSessionObject.role === "admin") {
            navigate("/admin");
          } else {
            if (dataSessionObject.path) {
              navigate(`/path/${dataSessionObject.id}`);
            } else if (!dataSessionObject.on_boarding) {
              navigate("/on-boarding");
            } else {
              navigate("/survey");
            }
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking login:", error);
      }
    };

    checkLogin();
  }, []);

  return <></>;
};

export default IndexPage;
