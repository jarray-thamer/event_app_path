import { SignedOut, SignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/register-redirect");
    }
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignedOut>
        <SignIn signUpUrl="/register" redirectUrl={"/register-redirect"} />
      </SignedOut>
    </div>
  );
};

export default SignInPage;
