import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled, { keyframes } from "styled-components"
import { HiOutlineSun } from "react-icons/hi"
import { HiOutlineMoon } from "react-icons/hi"
import { setTheme } from "../store/themeSlice"
import { WheelContext } from "../context/Wheel"

function Toggler() {
  const { color: wheelColor, setColor: setWheelColor } =
    useContext(WheelContext)
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  return (
    <Button
      onClick={() => {
        const newMode = theme.mode === "light" ? "dark" : "light"
        dispatch(
          setTheme({
            mode: newMode,
            prev: theme.mode,
          })
        )

        setWheelColor(wheelColor)
        localStorage.setItem("theme", newMode)
      }}
    >
      <SvgWrapper
        mode={theme.mode}
        prevMode={theme.prev}
        className={`switchTo--light ${theme.prev ? "animate" : undefined}`}
      >
        <HiOutlineMoon />
      </SvgWrapper>

      <SvgWrapper
        mode={theme.mode}
        prevMode={theme.prev}
        className={`switchTo--dark ${theme.prev ? "animate" : undefined}`}
      >
        <HiOutlineSun />
      </SvgWrapper>
    </Button>
  )
}

export default Toggler

const rotateTo = (from, to) => keyframes`
  from {
    transform: translate(-50%, -50%) rotate(${from}deg);
  } to {
    transform: translate(-50%, -50%) rotate(${to}deg);
  }
`

const SvgWrapper = styled.div`
  pointer-events: none;
  transition: 0.5s ease opacity;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  mix-blend-mode: difference;

  &.switchTo {
    &--light {
      opacity: ${(props) => (props.mode === "light" ? 1 : 0)};
      font-size: 2.1rem;

      &.animate {
        animation: ${(props) =>
            props.prevMode === "dark" ? rotateTo(90, 0) : rotateTo(0, 90)}
          0.5s ease forwards;
      }

      svg {
        color: white;
      }

      @media (max-width: 1200px) {
        font-size: 1.9rem;
      }
    }

    &--dark {
      opacity: ${(props) => (props.mode === "dark" ? 1 : 0)};
      font-size: 2rem;

      &.animate {
        animation: ${(props) =>
            props.prevMode === "light" ? rotateTo(-90, 0) : rotateTo(0, -90)}
          0.5s ease forwards;
      }

      svg {
        color: #d8d8d8;
      }
    }
  }
`

const Button = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  position: relative;
`
