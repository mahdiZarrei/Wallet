import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./AppContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
//TODO https://react-hot-toast.com/
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="bottom-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <AppContainer />
  </StrictMode>
);
