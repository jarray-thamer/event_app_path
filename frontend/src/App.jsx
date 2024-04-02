import { Routes, Route } from "react-router-dom";

import SurveyPage from "./pages/SurveyPage";
import PathPage from "./pages/PathPage";
import IndexPage from "./pages/IndexPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import Admin from "./pages/Admin";
import RegisterRedirectUser from "./pages/RegisterRedirectUser";

import SignUpPage from "./pages/Sign-up";
import SignInPage from "./pages/Sign-in";

function App() {
  return (
    <Routes>
      <Route path="*" element={<IndexPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/on-boarding" element={<OnBoardingPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/path/:id" element={<PathPage />} />
      <Route path="/admin/:id" element={<Admin />} />
      <Route path="/register-redirect" element={<RegisterRedirectUser />} />
    </Routes>
  );
}

export default App;
