import { SignedOut, SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    navigate("/register-redirect");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignedOut>
        <SignUp signInUrl="/login" redirectUrl={"/register-redirect"} />
      </SignedOut>
    </div>
  );
};

export default SignUpPage;
