import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "frontend/context";
import { Nav, Footer, RoutesList } from "frontend/components";

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
