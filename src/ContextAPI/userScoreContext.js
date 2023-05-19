import React, { createContext, useState } from "react";

export const userScoreContext = createContext();

export function ScoreFunctionProvider({ children }) {
  const [value, setValue] = useState(100);

  return (
    <userScoreContext.Provider value={{ value, setValue }}>
      {children}
    </userScoreContext.Provider>
  );
}
