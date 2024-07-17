import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { VerificationForm } from "./components/VerificationForm";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<VerificationForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
