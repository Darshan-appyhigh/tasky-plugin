import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { INITIAL_TIME } from "../../contants/page";
import classes from "./styles.module.css";

const Home = () => {
  const [inputData, setInputData] = useState("");
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState(INITIAL_TIME);

  useEffect(() => {
    // Storage Listeners
    chrome.storage.onChanged.addListener((changes) => {
      if (changes?.time) {
        setTime(changes.time.newValue);
      }
    });

    // Initial data fetching from storage
    chrome.storage.local.get(["tasks"], (res) => {
      if (res.tasks) {
        setTasks(res.tasks);
      }
    });
  }, []);

  const addTaskHandler = () => {
    // First add it to local storage and
    chrome.storage.local.set({ tasks: [...tasks, inputData] }, () => {
      // After that update the react state
      setTasks((prev) => [...prev, inputData]);
    });
  };

  const taskDeleteHandler = (i) => {
    const newTask = [...tasks];
    newTask.splice(i, 1);
    chrome.storage.local.set({ tasks: newTask }, () => {
      setTasks(newTask);
    });
  };

  const startHandler = () => {
    chrome.runtime.sendMessage({ message: "START" });
  };
  const pauseHandler = () => {
    chrome.runtime.sendMessage({ message: "PAUSE" });
  };
  const resetHandler = () => {
    chrome.runtime.sendMessage({ message: "STOP" });
  };

  return (
    <div className={clsx(classes.root, "mt-5")}>
      <div
        className={clsx(
          classes.timerBox,
          "d-flex align-items-center justify-content-center my-5"
        )}
      >
        <p>{new Date(time * 1000).toISOString().substr(11, 8)}</p>
      </div>
      <div
        style={{ margin: "25px auto" }}
        className="w-50 d-flex justify-content-between"
      >
        <Button clickHandler={startHandler} title="Start" />
        <Button clickHandler={pauseHandler} title="Pause" />
        <Button clickHandler={resetHandler} title="Reset" />
      </div>
      <div className={clsx(classes.inputBox)}>
        <input
          onChange={(e) => {
            setInputData(e.target.value);
          }}
          type="text"
          className={clsx(classes.input, "w-100")}
        />
        <div className="w-100 d-flex justify-content-center mt-3">
          <Button title="Add" clickHandler={addTaskHandler} />
        </div>
      </div>
      <div className={clsx(classes.tasksBox)}>
        {tasks.length === 0 ? (
          <p className="text-center my-5 text-grey">No Tasks Left</p>
        ) : (
          tasks.map((el, i) => {
            return (
              <div
                key={`task-${i}`}
                className={clsx(
                  classes.task,
                  "d-flex align-items-center justify-content-between mt-5"
                )}
              >
                <span>{el}</span>
                <Button
                  title="Delete"
                  clickHandler={() => {
                    taskDeleteHandler(i);
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
