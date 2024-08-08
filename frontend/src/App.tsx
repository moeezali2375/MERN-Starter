import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { VerificationForm } from "./components/VerificationForm";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "./components/PrivateRoute";
import VerifiedRoute from "./components/VerifiedRoute";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/verify" element={<VerificationForm />} />
          <Route element={<VerifiedRoute />}>
            <Route path="/home" element={<h2>hello</h2>} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
