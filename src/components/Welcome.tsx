import { toast } from "react-toastify";
import { FC, ChangeEvent, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/outline";

import "react-toastify/dist/ReactToastify.css";

import useAPI from "../hooks/useAPI";
import { useSelector, actions, useDispatch } from "../store";
import Navbar from "./Navbar";

const Welcome: FC = () => {
  const { getTasks } = useAPI();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  //   useEffect(() => {
  //     if (!query.completed) return;

  //     toast(`You have completed task #${query.completed}`, { type: 'success' });
  //   }, [query]);

  useEffect(() => {
    if (tasks.length) return;

    getTasks().then((tasks) => {
      dispatch(actions.set({ tasks }));
    });
  }, [getTasks, dispatch, tasks]);

  return (
    <main className="">
      <Navbar />
      <div className="px-20 text-white py-10 space-y-5 text-base">
        <p className="max-w-xs">
          To the VINCI code test. Please have a look at the README.md.
        </p>
        <p className="max-w-xs">
          If you installed everything correctly, you should see a list of 4
          items below:
        </p>
        <ol className="max-w-xs">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex flex-row justify-between text-base pb-2 items-center"
            >
              <p>{task.description}</p>
              <div className="flex flex-row">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    className="sr-only peer"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const update = tasks.slice();

                      update[index] = {
                        ...task,
                        done: e.target.checked,
                      };

                      dispatch(actions.set({ tasks: update }));

                      if (update[index].done)
                        toast(`You have completed task #${index + 1}`, {
                          type: "success",
                        });
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {task.done ? (
                      <CheckIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      "To do"
                    )}
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ol>
        <p>
          Good luck!<i>- Luuk</i>
        </p>
      </div>
    </main>
  );
};

export default Welcome;
