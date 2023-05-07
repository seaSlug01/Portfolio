import React from 'react'
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import {AiOutlineHome, AiOutlineExpand} from "react-icons/ai";
import { MdAlternateEmail} from "react-icons/md";

function NavLinkArea({visible, theme}) {
  return (
    <Container visible={visible} theme={theme}>
      <Block>
        <NavLink to="/"><AiOutlineHome />Home</NavLink>
        <NavLink to="/projects"><AiOutlineExpand />Projects</NavLink>
        <NavLink to="/contact"><MdAlternateEmail />Contact</NavLink>
      </Block>
    </Container>
  )
}

export default NavLinkArea

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 75%;
  gap: 1rem;
`;

const Container = styled.div`
  width: 30rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${props => props.theme === "dark" ? "#f8f8f8" : "rgb(38, 38, 38)"};
  backdrop-filter: ${props => props.theme === "dark" ? "none" : "blur(4px)"};
  position: fixed;
  top: 0;
  right: 2rem;
  visibility: ${props => props.visible ? "visible": "hidden" };
  transition: all 0.3s ease;
  clip-path: circle(${props => props.visible ? "100%" : 0});
  transform: scale(${props => props.visible ? 1 : 0.5});
  padding-inline: 1.5rem;
  box-shadow: inset 0px 0px 20px ${props => props.theme === "dark" ? "#7c7c7c" : "rgb(118 118 118)"};

  a {
    height: 2.5rem;
    display: flex;
    align-items: center;
    padding-block: 1rem;
    color: ${props => props.theme === "dark" ? "#3e3e3e" : "#dddddd"};
    transition: transform 0.5s ease;
    position: relative;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0;

    &.active {
      color: ${props => props.theme === "dark" ? "#3e3e3e" : "white"};

      &::before {
        background: ${props => props.theme === "dark" ? "rgb(74 74 74)" : "white"};
      }


      &:hover {
        transform: translateY(0px);
      }
    }

    &:first-of-type {
      svg {
        font-size: 1.1rem;
      }
    }

    svg {
      margin-right: 0.5rem;
      font-size: 1rem;
      transition: color 0.3s ease;
    }

    &::after, &::before {
      content: "";
      position: absolute;
      top: calc(100% - 0.3rem);
      left: 0;
      height: 1.5px;
    }

    &::before {
      width: 100%;
      background: ${props => props.theme === "dark" ? "#c4c4c4" : "rgb(124 124 124)"};
    }

    &::after {
      width: 0;
      transition: width 0.3s ease;
      background: ${props => props.theme === "dark" ? "#3e3e3e" : "white"};
    }

    &:hover {
      transform: translateY(-2px);
      color: ${props => props.theme === "dark" ? "black" : "white"};;

      &::after {
        width: 100%;
      }
    }
  }


  @media (max-width: 850px) {
    width: 100vw;
    border-radius: 0px;
    left: 0px;
    height: auto;
    top: 3rem;
    background: rgb(50 50 50 / 81%);
    box-shadow: none;
    border-bottom: 2px solid grey;
    padding-left: 3.8rem;

    ${Block} {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      padding-block: 0.5rem;
      gap: 0.5rem;

      a {
        color: #e9e9e9;
        font-size: 1rem;

        &.active, &:hover {
          color: white;
        }

        &.active {
          &::before {
            display: block;
            background: white;
            height: 1px;
            top: calc(100% - 0.6rem);
          }
        }

        &::before, &::after {
          display: none;
        }
      }

      
    }
  }

  @media (max-width: 800px) {
    padding-inline: 1.5rem;
  }
`;