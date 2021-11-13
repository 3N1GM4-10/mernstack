import { createContext, useContext, useState } from "react";

const databaseContext = createContext();

export const useDatabaseContext = () => {
  return useContext(databaseContext);
};
export const DatabaseContextProvider = ({ children }) => {
  const [database, setDatabase] = useState([]);

  const values = {
    database,
    setDatabase,
  };
  return (
    <databaseContext.Provider value={values}>
      {children}
    </databaseContext.Provider>
  );
};
