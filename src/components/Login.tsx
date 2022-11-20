import { toast } from "react-toastify";
import { FC, ChangeEvent, useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";

import "react-toastify/dist/ReactToastify.css";

import useAPI from "../hooks/useAPI";
import { useDispatch } from "../store";
import Navbar from "./Navbar";

const Login: FC = () => {
  const { authenticate } = useAPI();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submit = () => {
    if (email && password) {
      authenticate(email, password).then((cookie) => {
        if (cookie) {
          toast(`Logged In`, { type: "success" });
          setTimeout(() => {
            window.location.pathname = "/";
          }, 5000);
        }
      });
    }
  };

  return (
    <main className="">
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-lg shadow-md w-1/3 m-10 p-5 flex-col flex space-y-4">
          <h1 className="font-bold text-xl text-gray-900">Login</h1>
          <input
            placeholder="Email"
            className="border w-full text-xl text-black px-5 py-2"
            type={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            className="border w-full text-xl text-black px-5 py-2"
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button
              onClick={submit}
              className="rounded-md bg-gray-900 px-10 py-2 shadow-sm text-white w-1/3 mt-2 "
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
