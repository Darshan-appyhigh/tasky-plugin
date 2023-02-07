import React from "react";

const pageContext = React.createContext({
  activePage: null,
  setActivePage: (item: any) => {},
});

export default pageContext;
