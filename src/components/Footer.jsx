import React from 'react'
import {useSelector} from "react-redux";
import styled from "styled-components";


function Footer() {
  const theme = useSelector(state => state.theme.mode)
  
  return (
    <Wrapper theme={theme}>
      <p>Κωνσταντίνος Τζιανακούλης &copy; 2022-{new Date().getFullYear()} All Rights Reserved</p>
    </Wrapper>
  )
}

export default Footer


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 1.2rem;
  color: ${props => props.theme === "dark" ? "white" : "black"};
  font-weight: ${props => props.theme === "dark" ? "300" : "400"};
  font-size: 0.9375rem;
  margin-top: 4rem;
  position: relative;

  &::after {
    content: "";
    border-top: thin solid rgb(133, 133, 133);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 15rem);
    position: absolute;
  }

  @media (max-width: 1550px) {
    &::after {
      width: calc(100% - 10.6vw);
    }
  }

  @media (max-width: 800px) {
    &::after {
      width: calc(100% - 1.5rem);
    }
  }
`;