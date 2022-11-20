import { toast } from "react-toastify";
import { FC, ChangeEvent, useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";

import "react-toastify/dist/ReactToastify.css";

import useAPI from "../hooks/useAPI";
import { actions, useDispatch, useSelector } from "../store";
import Navbar from "./Navbar";

const Transactions: FC = () => {
  const { getTransactions } = useAPI();
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState<number>(0);
  const transactions = useSelector((state) => state.transactions);
  useEffect(() => {
    if (transactions?.length) {
      setPageNo(0);
      dispatch(actions.clearStore({}));
    }
    //Its clearing and loading new here
    getTransactions(pageNo).then((trans) => {
      dispatch(actions.addTrasnsaction({ transactions: trans }));
    });
  }, [getTransactions, dispatch]);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  const loadMore = () => {
    setPageNo((prev) => prev + 1);
    getTransactions(pageNo).then((trans) => {
      dispatch(actions.addTrasnsaction({ transactions: trans }));
    });
  };
  return (
    <main className="">
      <Navbar />
      <div className="flex flex-col p-10 overflow-auto ">
        <h1 className="font-bold text-xl text-white">Transactions</h1>

        <table className="table-auto text-gray-900  bg-white mt-10  ">
          <thead className="bg-gray-900 text-white border border-white rounded-sm">
            <tr>
              <th>Id</th>
              <th>Amount</th>
              <th>From</th>
              <th>To</th>
              <th>Token</th>
              <th>Token Name</th>
            </tr>
          </thead>
          <tbody>
            {Object?.values(transactions)?.map((item) => (
              <tr className="hover:bg-gray-200">
                <td className="p-3 border border-gray-900">{item?.id}</td>
                <td className="p-3 border border-gray-900">{item?.amount}</td>
                <td className="p-3 border border-gray-900">{item?.from}</td>
                <td className="p-3 border border-gray-900">{item?.to}</td>
                <td className="p-3 border border-gray-900">{item?.token}</td>
                <td className="p-3 border border-gray-900">
                  {item?.tokenName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="rounded-md bg-gray-900 px-10 py-2 shadow-sm text-white w-1/3 mt-2 "
          >
            More
          </button>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
