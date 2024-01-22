import React, { createContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const WheelContext = createContext({
  color: "blue",
  setColor: () => {},
})

const colors = {
  dark: {
    orange: "#ff9c6d",
    green: "#73ff73",
    violet: "#e5a5ff",
    blue: "rgb(163 195 255)",
  },
  light: {
    orange: "rgb(255 90 40)",
    green: "rgb(45 173 62)",
    violet: "rgb(186 86 249)",
    blue: "rgb(47 116 247)",
  },
}

export function WheelContextProvider({ children }) {
  const theme = useSelector((state) => state.theme)
  const [color, setColor] = useState({
    name: "blue",
    code: colors[theme.mode]["blue"],
  })

  useEffect(() => {
    setTimeout(() => {
      console.log("Whats da theme", theme.mode)
      setColor({
        name: "blue",
        code: colors[theme.mode]["blue"],
      })
    }, 1000)
  }, [])

  const adjuctColor = (name) => {
    console.log("Whats da color", name, typeof name, theme.mode)
    setColor({
      name,
      code: colors[theme.mode][name],
    })
  }

  const setWheelColorThroughMode = (mode) => {
    setColor({
      name: color.name,
      code: colors[mode][color.name],
    })
  }

  return (
    <WheelContext.Provider
      value={{ color, setColor: adjuctColor, setWheelColorThroughMode }}
    >
      {children}
    </WheelContext.Provider>
  )
}
