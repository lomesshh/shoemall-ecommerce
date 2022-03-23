import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/pages/Nav";
import Footer from "./components/pages/Footer";
import RoutesList from "./components/pages/RoutesList";

export default function App() {
  return (
    <>
      <Nav />
      <RoutesList />
      <Footer />
      <ToastContainer />
    </>
  );
}
