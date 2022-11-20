import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Welcome from "./Welcome";

import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Transactions from "./Transactions";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Welcome />} />
        <Route path="/login" element={<Login />} />\
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      <ToastContainer
        style={{ fontSize: "16px" }}
        theme="dark"
        position="bottom-right"
      />
    </>
  );
}
