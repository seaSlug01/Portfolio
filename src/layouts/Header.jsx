import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Logo from "../components/Logo.jsx"
import Burger from "../components/Burger"
import NavLinkArea from "./NavLinkArea"
import throttle from "lodash.throttle"
import Toggler from "../components/Toggler.jsx"

function Header({ theme }) {
  const [navLinks, setNavLinks] = useState(false)
  const [navLine, setNavLine] = useState(true)
  const burgerRef = useRef(null)
  const toggleNavLinks = () => setNavLinks(!navLinks)

  useEffect(() => {
    const clickHandler = window.addEventListener("click", hideNavLinks)

    return () => window.removeEventListener("click", clickHandler)
  }, [])

  useEffect(() => {
    const scrollHandler = throttle(() => {
      const showNavLine = window.scrollY < 50
      setNavLine(showNavLine)
      setNavLinks(false)
    }, 250)

    window.addEventListener("scroll", scrollHandler)

    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  const hideNavLinks = (e) => {
    if (e.target !== burgerRef.current) {
      setNavLinks(false)
    }
  }

  return (
    <>
      <HeaderMain navLine={navLine} theme={theme}>
        <Link to="/" className="logo">
          <Logo />
        </Link>
        <NavLinkArea visible={navLinks} theme={theme} />
        <NavActions>
          <Toggler />
          <Burger
            toggleNavLinks={toggleNavLinks}
            active={navLinks}
            ref={burgerRef}
          />
        </NavActions>
      </HeaderMain>
    </>
  )
}

export default Header

const NavActions = styled.div`
  display: flex;
  gap: 3rem;

  @media (max-width: 550px) {
    gap: 1.5rem;
  }
`

const HeaderMain = styled.div`
  width: 100%;
  height: 4rem;
  padding-inline: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: ${(props) =>
    props.theme === "dark"
      ? "rgba(50, 50, 50, 0.5)"
      : "rgba(249, 249, 249, 0.65)"};
  backdrop-filter: blur(5px);

  &::after {
    content: "";
    height: 100%;
    width: calc(100% - 20rem);
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%)
      ${(props) => (props.navLine ? "scaleX(0)" : "scaleX(1)")};
    border-bottom: thin solid rgb(133, 133, 133);
    background: transparent;
    z-index: -1;
    transition: 0.5s transform ease;
  }

  .logo {
    svg {
      width: 9rem;
    }
  }

  @media (max-width: 1550px) {
    padding-inline: 8vw;

    &::after {
      width: calc(100% - 16vw);
    }
  }

  @media (max-width: 950px) {
    height: 3rem;
  }

  @media (max-width: 800px) {
    padding-inline: 1rem;

    &::after {
      width: calc(100% - 2rem);
    }
  }
`
