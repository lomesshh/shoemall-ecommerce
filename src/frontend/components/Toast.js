import { Slide, toast, style } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (msg, type) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    type: type,
    transition: Slide,
    theme: "light",
  });

export { Notify };
