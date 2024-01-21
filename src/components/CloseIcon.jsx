import React from 'react'
import styled from "styled-components";
import { useSelector } from "react-redux";
import {TfiClose} from "react-icons/tfi";
import { BsArrowLeft } from "react-icons/bs";

function CloseIcon() {
  const screenSize = useSelector(state => state.mediaQuerySize.mediaSize)
  console.log("screenSize", screenSize)
  return (
    <Container>
      { screenSize > 1 ? <TfiClose /> : <BsArrowLeft /> }
    </Container>
  )
}

export default CloseIcon

const Container = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: white;
  font-size: 1.1rem;
  background: #46464685;
  backdrop-filter: blur(2px);
  transition: background 0.3s ease;
  z-index: 100;

  &:hover {
    background: rgb(70 70 70 / 41%);
  }
`;