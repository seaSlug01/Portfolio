import React, { useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { togglePortal } from "../store/portalSlice"
import { setSelectedProject } from "../store/projectsSlice"
import useInterval from "../hooks/useInterval"
import styled from "styled-components"
import Card from "../components/Card"
import { setIsRunning } from "../store/setIntervalSlice"
import { WheelContext } from "../context/Wheel"

function Wheel() {
  const { setColor: setWheelColor } = useContext(WheelContext)
  const dispatch = useDispatch()
  const items = useSelector((state) => state.projects.projectsData)
  const { imageSize } = useSelector((state) => state.mediaQuerySize)
  const theme = useSelector((state) => state.theme.mode)

  const animationSpeed = 800
  const totalItems = items.length
  const totalFullRotations = Math.ceil(items.length / 4)
  const lastBatchLength = totalItems % 4 === 0 ? 4 : totalItems % 4
  const [animated, setAnimated] = useState(true)
  const [allowClick, setAllowClick] = useState(true)

  const [rotationDegrees, setRotationDegrees] = useState(0)
  const [currentBatch, setCurrentBatch] = useState({
    batch: items.slice(0, 4),
    position: 0,
  })

  const [currentRotation, setCurrentRotation] = useState(1)

  const rotateWheel = () => {
    if (!allowClick) return
    const curRot = currentRotation === totalItems ? 1 : currentRotation + 1
    setCurrentRotation(curRot)
    setRotationDegrees(rotationDegrees + 90)
    setAllowClick(false)

    // need to know the visible project

    setTimeout(() => {
      setAllowClick(true)
    }, animationSpeed)

    setWheelColor(
      items[currentRotation === totalItems ? 0 : currentRotation]?.heading
        ?.color
    )

    if (
      currentRotation === totalItems ||
      currentBatch.batch.length * (currentBatch.position + 1) ===
        currentRotation
    ) {
      // console.log("Im triggering", currentRotation === totalItems, currentBatch.batch.length * (currentBatch.position + 1) === currentRotation)
      const newPosition =
        currentRotation === totalItems ? 0 : currentBatch.position + 1
      // get the item thats coming, and THEN you're gonna update it

      // we're on last rotation
      let batch = []
      if (newPosition + 1 === totalFullRotations && lastBatchLength !== 4) {
        const lastPrevItems = currentBatch.batch.slice(lastBatchLength)
        batch = items.slice(newPosition * 4).concat(lastPrevItems)
      } else if (newPosition === 0 && lastBatchLength !== 4) {
        let lastPrevItem = currentBatch.batch[lastBatchLength - 1]
        if (lastBatchLength > 1) {
          let temp = items.slice(0, 3)
          const spliced = temp.splice(4 - lastBatchLength)
          batch = spliced.concat(temp.slice(0, lastBatchLength))
          batch.splice(lastBatchLength - 1, 0, lastPrevItem)
        } else {
          batch = [lastPrevItem].concat(items.slice(0, 3))
        }
      } else {
        const lastPrevItem = currentBatch.batch[currentBatch.batch.length - 1]
        batch = items
          .slice(newPosition * 4, newPosition * 4 + 3)
          .concat(lastPrevItem)
      }

      setCurrentBatch({
        batch,
        position: newPosition,
      })

      setTimeout(() => {
        if (currentRotation === totalItems) {
          setAnimated(false)
          setRotationDegrees(0)
          const insert = items[3]
          batch.splice(lastBatchLength - 1, 1, insert)
          setCurrentBatch({
            batch: items.slice(0, 4),
            position: newPosition,
          })

          setTimeout(() => {
            setAnimated(true)
          }, 50)
        } else {
          if (
            (newPosition + 1 === totalFullRotations || newPosition === 0) &&
            lastBatchLength !== 4
          )
            return

          setCurrentBatch({
            batch: items.slice(newPosition * 4, newPosition * 4 + 4),
            position: newPosition,
          })
        }
      }, animationSpeed)
    }
  }

  useInterval(rotateWheel, "wheel", 6000)

  useEffect(() => {
    const visibilityChange = function () {
      const isRunning = document.hidden ? false : true
      dispatch(setIsRunning({ isRunning, name: "wheel" }))
    }

    document.addEventListener("visibilitychange", visibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", visibilityChange)
    }
  }, [])

  useEffect(() => {
    setWheelColor(items[0].heading.color)

    return () => {
      setWheelColor(items[0].heading.color)
    }
  }, [])

  return (
    <Container
      rotateDegress={rotationDegrees}
      animated={animated}
      animationSpeed={animationSpeed / 1000}
      theme={theme}
    >
      {currentBatch.batch.map(({ id, images, heading, textFields }, index) => (
        <Li
          className={`${index}`}
          theme={theme}
          key={id}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              rotateWheel()
            }
          }}
        >
          <Item
            onClick={(e) => {
              const { left, top, width, height } =
                e.currentTarget.getBoundingClientRect()

              dispatch(setSelectedProject({ id }))
              dispatch(
                togglePortal({
                  show: true,
                  component: "Project",
                  cordinates: { left, top, width, height },
                })
              )
            }}
          >
            <Card
              theme={theme}
              image={images[0].src[imageSize]}
              heading={heading}
              details={textFields[0]}
            />
          </Item>
        </Li>
      ))}
    </Container>
  )
}

export default Wheel

const Item = styled.div`
  position: absolute;
`

const Li = styled.li`
  list-style-type: none;
  width: 50%;
  height: 50%;
  position: absolute;
  min-width: 21.5vw;
  min-height: 21.5vw;

  &:nth-of-type(1) {
    border-right: 1px solid
      ${(props) => (props.theme === "dark" ? "white" : "black")};
    border-bottom: 1px solid
      ${(props) => (props.theme === "dark" ? "white" : "black")};
    top: 0;
    left: 0;

    & ${Item} {
      bottom: 0;
      transform: translate(-100%, 50%);
    }
  }

  &:nth-of-type(2) {
    transform: translateY(100%) rotate(270deg);

    & ${Item} {
      top: 100%;
      right: 100%;
      transform: translateY(-50%);
    }
  }

  &:nth-of-type(3) {
    border-left: 1px solid
      ${(props) => (props.theme === "dark" ? "white" : "black")};
    border-top: 1px solid
      ${(props) => (props.theme === "dark" ? "white" : "black")};
    transform: translate(100%, 100%);

    & ${Item} {
      right: 0;
      transform: translate(100%, -50%) rotate(180deg);
    }
  }

  &:nth-of-type(4) {
    transform: translateX(100%) rotate(90deg);

    & ${Item} {
      top: 100%;
      transform: translate(-100%, -50%);
    }
  }
`

const Container = styled.ul`
  width: 43vw;
  height: 43vw;
  position: absolute;
  transform: translateX(64.5%) rotate(${(props) => props.rotateDegress}deg);
  cursor: pointer;
  ${(props) =>
    props.animated && `transition: ${props.animationSpeed}s ease-in-out all`};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  &::before {
    width: 95%;
    height: 95%;
    border: 1px solid ${(props) => (props.theme === "dark" ? "white" : "black")};
  }

  &::after {
    width: 3rem;
    height: 3rem;
    outline: 1px solid
      ${(props) => (props.theme === "dark" ? "white" : "black")};
    outline-offset: 1rem;
    background: ${(props) => (props.theme === "dark" ? "white" : "black")};
  }
`
