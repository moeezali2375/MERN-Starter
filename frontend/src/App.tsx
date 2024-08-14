import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Auth from "@/components/Auth";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { VerificationForm } from "@/components/VerificationForm";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "@/components/PrivateRoute";
import VerifiedRoute from "@/components/VerifiedRoute";
import ProtectedComp from "@/components/ProtectedComp";
import ChangeEmailVerification from "@/components/ChangeEmailVerification";
import ForgetPwd from "@/components/ForgetPwd";
import ResetPwd from "@/components/ResetPwd";
import { useEffect } from "react";
import useUser from "@/context/User/UserHook";

function App() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/password/verify/:email/:token" element={<ResetPwd />} />
        <Route path="/password/forget" element={<ForgetPwd />} />
        <Route path="/" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/verify" element={<VerificationForm />} />
          <Route element={<VerifiedRoute />}>
            <Route
              path="/email/verify/:token"
              element={<ChangeEmailVerification />}
            />
            <Route path="/home" element={<ProtectedComp />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
