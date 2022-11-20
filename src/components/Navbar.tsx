import { toast } from "react-toastify";
import { FC, ChangeEvent, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/outline";

import "react-toastify/dist/ReactToastify.css";

import useAPI from "../hooks/useAPI";
import { useSelector, actions, useDispatch } from "../store";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <main className="">
      <div className="bg-gray-900 px-20 text-white py-10 flex flex-row space-x-4">
        <Link to="/">
          <h1 className="text-lg font-semibold cursor-pointer">Welcome</h1>
        </Link>
        <Link to="/login">
          <h1 className="text-lg font-semibold cursor-pointer">Login</h1>
        </Link>
        <Link to="/transactions">
          <h1 className="text-lg font-semibold cursor-pointer">Transactions</h1>
        </Link>
      </div>
    </main>
  );
};

export default Navbar;
