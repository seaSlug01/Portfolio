import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import throttle from "lodash.throttle";

function SubmitButton({text, icon, theme, ...restProps}) {
  const ref = useRef();
  const [cursorPosition, setCursorPosition] = useState({
    x: null,
    y: null
  })

  useEffect(() => {
    let localRef = null;

    if(ref.current) localRef = ref.current;

    const clipIt = throttle((e) => {
      var rect = e.target.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }, 200)

    localRef.addEventListener("mousemove", clipIt);

    return () => {
      localRef.removeEventListener("mousemove", clipIt)
    }

  }, [])


  return (
    <Button
      theme={theme}
      ref={ref}
      clipCordinates={cursorPosition}
      {...restProps}
      
      >
        <Text>
          {icon || undefined}
          {text || "Send"}</Text>
    </Button>
  )
}

export default SubmitButton

const Text = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  svg {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  font-weight: bold;
  color: #303030;
  border-radius: 0.4rem;
  display: flex;
  background: ${props => props.theme === "dark" ? "rgb(255 155 116)" : "rgb(116 204 255)"};
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding-block: 0.9rem;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.1s ease;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    box-shadow: none;
  }
  
  & > * { 
    pointer-events: none;
  }

  &:active {
    transform: scale(0.98) translateY(-2px);
    background: ${props => props.theme === "dark" ? "rgb(255 135 88)" : "rgb(116 204 255)"};
  }

  &:hover {
    /* box-shadow: rgb(104 70 56 / 79%) 0px 10px 20px; */
    &::after {
      visibility: visible;
      clip-path: circle(60px at ${props => `${props.clipCordinates.x}px`} ${props => `${props.clipCordinates.y}px`});
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    visibility: hidden;
    z-index: 0;
    transition: 0.5s all ease;
    clip-path: circle(0 at ${props => `${props.clipCordinates.x}px`} ${props => `${props.clipCordinates.y}px`});
  }

  @media (max-width: 850px) {

    &.btn-contact {
      padding-block: 0.75rem;

      &:hover {
        &::after {
          clip-path: circle(40px at ${props => `${props.clipCordinates.x}px`} ${props => `${props.clipCordinates.y}px`});
        }
      }
    }
    
  }
`;