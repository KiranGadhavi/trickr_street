"use client";

import React from "react";
import { createContext, useState } from "react";

export const MyContext = createContext();

export default function StateWrapperComponent({ children }) {
  const [value, setValue] = useState("Initial value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}
