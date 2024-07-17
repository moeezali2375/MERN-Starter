import "./App.css";
// import Auth from "./components/Auth";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      {/* <Auth /> */}
    </ThemeProvider>
  );
}

export default App;
