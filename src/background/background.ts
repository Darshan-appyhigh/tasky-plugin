// TODO: background script

import { INITIAL_TIME } from "../contants/page";

chrome.runtime.onInstalled.addListener(() => {
  // // TODO: on installed function
  chrome.storage.local.set({ tasks: [] }, () => {});

  // Set the initial time inside the local storage

  chrome.storage.local.set({ time: INITIAL_TIME });

  chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.message === "START") {
      // Create our alarm
      chrome.alarms.create("timer", { periodInMinutes: 1 / 60 });
      chrome.notifications.create("start-timer-id", {
        type: "basic",
        iconUrl: "icon128.png",
        title: `Timer Started.`,
        message: `You have 30 mins to complete tasks.`,
      });
    } else if (req.message === "PAUSE") {
      // Pause the timer
      chrome.alarms.clear("timer", () => {
        console.log("Cleared timer");
      });
    } else if (req.message === "STOP") {
      // Stop the timer
      chrome.alarms.clear("timer", () => {
        console.log("Cleared timer");
        chrome.storage.local.set({ time: INITIAL_TIME });
        chrome.notifications.create("stop-timer-id", {
          type: "basic",
          iconUrl: "icon128.png",
          title: `Timer Stopped.`,
          message: `You stopped the timer.`,
        });
      });
    }
  });

  // Alarm event handler

  chrome.alarms.onAlarm.addListener((alarmDetails) => {
    if (alarmDetails.name === "timer") {
      console.log("Timer went off...");
      chrome.storage.local.get(["time"], (res) => {
        if (res.time && res.time > 0) {
          chrome.storage.local.set({ time: res.time - 1 });
        } else {
          chrome.storage.local.get(["tasks"], (data) => {
            if (data.tasks.length === 0) {
              chrome.notifications.create("won", {
                type: "basic",
                iconUrl: "icon128.png",
                title: `Timer's UP.`,
                message: `You have completed all tasks.`,
              });
            } else if (data.tasks.length > 0) {
              chrome.notifications.create("lost", {
                type: "basic",
                iconUrl: "icon128.png",
                title: `Timer's UP.`,
                message: `You need to be more productive.`,
              });
            }
            chrome.alarms.clear("timer", () => {
              console.log("Cleared timer");
            });
          });
        }
      });
    }
  });
});
