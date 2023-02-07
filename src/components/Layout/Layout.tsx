import React, { useContext } from "react";
import { pages } from "../../contants/page";
import pageContext from "../../context/pageContext";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  const { activePage } = useContext(pageContext);
  return (
    <div className="container">
      {activePage !== pages.LOADING && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
