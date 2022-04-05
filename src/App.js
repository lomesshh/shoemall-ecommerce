import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/pages/Nav";
import Footer from "./components/pages/Footer";
import RoutesList from "./components/pages/RoutesList";
import { useAuth } from "./context/authcontext";

export default function App() {
  const { theme } = useAuth();

  return (
    <div className="App" data-theme={theme}>
      <Nav />
      <RoutesList />
      <Footer />
      <ToastContainer />
    </div>
  );
}
