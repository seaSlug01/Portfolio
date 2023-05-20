import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {removeLetter} from "../store/flyingLettersSlice";
import styled, {keyframes} from "styled-components";

function FlyingLetters({theme}) {
  const dispatch = useDispatch();
  const letters = useSelector(state => Object.values(state.flyingLetters.letters));
  
  
  return (
    <Container>
      {
        letters.map(l => (
          <Letter
            key={l.id}
            cordinates={l.cordinates}
            onAnimationEnd={() => dispatch(removeLetter({id: l.id}))}
            theme={theme}
            className={theme !== "dark" ? l.className : undefined}
            >
            {l.letter}
          </Letter>
        )
       )
      }
    </Container>
  )
}

export default FlyingLetters

const flyingLetterAnimation = (startX, startY, endX, endY, theme) => keyframes`
  from {
    top: ${startY}px;
    left: ${startX}px;
    transform: rotate(0deg);
    opacity: 1;
  } to {
    top: ${endY}px;
    left: ${endX}px;
    transform: rotate(720deg);
    opacity: ${theme === "dark" ? 0 : 0.7};
  }
`

const Letter = styled.span`
  position: absolute;
  color: white;
  animation: ${props => flyingLetterAnimation(props.cordinates?.startX, props.cordinates?.startY, props.cordinates?.endX, props.cordinates?.endY, props.theme)} 2s ease forwards;

  &.red {
    color: red;
  }

  &.blue {
    color: #1d86ff;
  }

  &.green {
    color: #37ff37;
  }

  &.yellow {
    color: #ffff6e;
  }

  &.purple {
    color: #ff40ff;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 100;
`

