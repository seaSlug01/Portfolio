import React from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";
import ContactForm from '../layouts/ContactForm';

function Contact(props) {
  const isModal = useSelector(state => state.portal.component?.toLowerCase() === "contact");
  const theme = useSelector(state => {
    if(isModal) return "dark";

    return state.theme.mode;
  })


  console.log("Whats the fucking theme", theme)
  return (
    <Container {...props} className={isModal ? "portal-form" : undefined}>
      <Header theme={theme}>
        <Con theme={theme}>
          <span>CON</span>
          <Shadow background={theme === "dark" ? "#f9f9f9" : "#1a1a1a"} />
        </Con>
        <Con>
          <span>TACT me.</span>
          <Shadow  background={theme === "dark" ? "rgb(50, 50, 50)" : "#f9f9f9"}/>
        </Con>
      </Header>
      <ContactForm isModal={isModal} theme={theme} /> 
    </Container>
    
  )
}

export default Contact

const Shadow = styled.div`
  display: block;
  background: ${props => props.background};
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  animation: lightenUp 0.3s ease-in forwards;

  @keyframes lightenUp {
    from {
      width: 100%;
    } to {
      width: 0;
    }
  }
`;

const Con = styled.div`
  position: relative;
  display: flex;

  &:first-of-type {

    span {
      color: ${props => props.theme === "dark" ? "#1a1a1a" : "white"};
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3em;
      height: 3em;
      background: ${props => props.theme === "dark" ? "#f9f9f9" : "#1a1a1a"};;
      border-radius: 50%;
      z-index: -1;
    }
  }
  
  &:nth-of-type(2) {
    span {
      mix-blend-mode: exclusion;
    }

    ${Shadow} {
      animation-delay: 0.25s;
      animation-duration: 0.6s;
      right: -1.2rem;
    }
    
  }
`;

const Header = styled.h1`
  position: relative;
  display: flex;
  font-size: 4rem;
  font-weight: lighter;
  letter-spacing: 4px;
`;


const Container = styled.div`
  margin-top: 5rem;
  padding-inline: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 5rem);

  ${Header} {
    margin-bottom: 6rem;
  }

  &.portal-form {
    background: rgb(50, 50, 50);
    z-index: 1;
    padding: 2rem;
    border-radius: 1rem; 
    margin-top: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    padding-block: 5rem;
    margin-top: 0;

    @media (max-width: 700px) {
      position: relative;
      top: 0;
      left: 0;
      transform: none;
      height: 100%;
      width: 100%;
    }

    ${Header} {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 775px) {
    align-items: center;
    padding-inline: 1rem;

    ${Header} {
      font-size: 2.5rem;
    }
  }
`;