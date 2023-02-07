import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Layout } from "../components";
import { INITIAL_TIME, pages } from "../contants/page";
import PageContext from "../context/pageContext";
import { Home, Loading } from "../pages";
import "./popup.css";

const App = () => {
  const [activePage, setActivePage] = useState(pages.LOADING);
  const [page, setPage] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["time"], (res) => {
      if (res.time !== INITIAL_TIME) {
        setActivePage(pages.HOME);
      } else {
        setActivePage(pages.LOADING);
      }
    });
  }, []);

  useEffect(() => {
    switch (activePage) {
      case pages.LOADING:
        setPage(<Loading />);
        break;
      case pages.HOME:
        setPage(<Home />);
        break;
      default:
        break;
    }
  }, [activePage]);

  return (
    <PageContext.Provider value={{ activePage, setActivePage }}>
      <Layout>{page}</Layout>
    </PageContext.Provider>
  );
};

const root = document.createElement("div");
root.className = "root";
document.body.appendChild(root);
ReactDOM.render(<App />, root);
