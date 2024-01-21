import React, { forwardRef } from 'react'
import styled from "styled-components";

const  Burger = forwardRef((props, ref) => {
  const {toggleNavLinks, active} = props;

  return (
    <Container onClick={toggleNavLinks} active={active} ref={ref}>
      <Line />
      <Line />
      <Line />
    </Container>
  )
})

export default Burger

const Line = styled.span`
  width: 100%;
  background: #d8d8d8;
  height: 2px;
  transition: width 0.5s ease;

  &:nth-of-type(2) {
    width: 75%;
    align-self: flex-end;
  }
`

const Container = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  mix-blend-mode: difference;

  & > * {
    pointer-events: none;
  }

  ${Line}:nth-child(2) {
    width: ${props => props.active ? "100%" : "75%"};
  }


  @media (max-width: 1200px) {
    width: 2rem;
    height: 2rem;
  }

`;




