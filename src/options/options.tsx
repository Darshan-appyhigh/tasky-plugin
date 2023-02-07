import React from "react";
import ReactDOM from "react-dom";
import "./options.css";

const App: React.FC<{}> = () => {
  const clearTaskHandler = () => {
    chrome.storage.local.set({ tasks: [] }, () => {
      console.log("tasks are cleared");
    });
  };

  const clearTimerHandler = () => {
    chrome.storage.local.set({ timer: 30 * 60 }, () => {
      console.log("Timer is cleared");
    });
  };

  return (
    <div>
      <h1>Hello from the options page</h1>
      <div>
        <button onClick={clearTaskHandler}>Clear Tasks</button>
        <button onClick={clearTimerHandler}>Clear Timer</button>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
