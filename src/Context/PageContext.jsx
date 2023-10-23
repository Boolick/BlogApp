import { createContext, useState } from "react";
import propTypes from "prop-types";

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

PageProvider.propTypes = {
  children: propTypes.node,
};
