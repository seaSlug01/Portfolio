import React from 'react'
import styled from "styled-components";

function HorizontalRule({theme, ...props}) {
  return (
    <HR theme={theme} {...props}>
      <span></span>
    </HR>
  )
}

export default HorizontalRule

const HR = styled.div`
  width: 100%;
  height: 0.5px;
  background: ${props => props.theme === "dark" ? "#858585" : "#6a6a6a"};
  position: relative;

  & > span, &::after, &::before {
    position: absolute;
    top: 50%;
    border-radius: 50%;
    width: 2.3rem;
    height: 2.3rem;
    border: thin solid ${props => props.theme === "dark" ? "#858585" : "#6a6a6a"};
  }

  &::after, &::before {
    content: "";
    border-top-color: ${props => props.theme === "dark" ? "rgb(50, 50, 50)" : "rgb(249, 249, 249)"};
  }

  & > span {
    left: 50%;
    transform: translate(-50%, -50%);
    border: thin solid ${props => props.theme === "dark" ? "#858585" : "#6a6a6a"};
  }

  &::before {
    left: -1.5rem;
    transform: translateY(-50%) rotate(-45deg);
    border-left-color: ${props => props.theme === "dark" ? "rgb(50, 50, 50)" : "rgb(249, 249, 249)"};
  }

  &::after {
    right: -1.5rem;
    transform: translateY(-50%) rotate(45deg);
    border-right-color: ${props => props.theme === "dark" ? "rgb(50, 50, 50)" : "rgb(249, 249, 249)"};
  }

  @media (max-width: 750px) {
    & > span, &::after, &::before {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;