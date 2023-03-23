import React from 'react'
import styled from "styled-components";

function HorizontalRule({...props}) {
  return (
    <HR {...props}>
      <span></span>
    </HR>
  )
}

export default HorizontalRule

const HR = styled.div`
  width: 100%;
  height: 0.5px;
  background: #858585;
  position: relative;

  & > span, &::after, &::before {
    position: absolute;
    top: 50%;
    border-radius: 50%;
    width: 2.3rem;
    height: 2.3rem;
    border: thin solid #858585;
  }

  &::after, &::before {
    content: "";
    border-top-color: rgb(50, 50, 50);
  }

  & > span {
    left: 50%;
    transform: translate(-50%, -50%);
    border: thin solid #858585;
  }

  &::before {
    left: -1.5rem;
    transform: translateY(-50%) rotate(-45deg);
    border-left-color: rgb(50, 50, 50);
  }

  &::after {
    right: -1.5rem;
    transform: translateY(-50%) rotate(45deg);
    border-right-color: rgb(50, 50, 50);
  }

  @media (max-width: 750px) {
    & > span, &::after, &::before {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;