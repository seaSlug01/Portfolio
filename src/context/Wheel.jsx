import React, { createContext, useState } from "react"

export const WheelContext = createContext({
  color: "blue",
  setColor: () => {},
})

export function WheelContextProvider({ children }) {
  const [color, setColor] = useState("blue")

  console.log(color)

  return (
    <WheelContext.Provider value={{ color, setColor }}>
      {children}
    </WheelContext.Provider>
  )
}
