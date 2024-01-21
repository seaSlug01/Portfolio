import React, {useState} from 'react'
import styled from "styled-components";
import { Label, FieldIcon as Icon } from '../styles/reusableStyles';
import {BsTelephoneForward} from "react-icons/bs";

function MyPhoneNumber({theme}) {
  const [text, setText] = useState({
    str: `kidding...Just send me a message and try out this cute form. I will make sure to reach you :)`,
    show: false,
    animate: true
  });


  console.log("THEME IN PHONE NUMBER", theme)

  return (
    <Container onClick={() => setText({...text, show: !text.show})}>
      <Group>
        <Icon theme={theme}>
          <BsTelephoneForward />
        </Icon>
        <Label as="div" theme={theme}>My Phone Number:</Label>
      </Group>
      <Group>
        <Paragraph className={`${text.show ? "show" : undefined}`} theme={theme}>
           +30 6942.......Hah...
           {text.show && 
            text.str.split("").map((letter, i) => <Letter onAnimationEnd={() => {
              if(i === text.str.length -1) {
                setText({...text, animate: false})
              }
            }} 
            key={i} 
            delay={i}
            className={text.animate ? "animate" : undefined}
            theme={theme}
            >{letter}</Letter>)
            }
        </Paragraph>
      </Group>
    </Container>
    
  )
}

export default MyPhoneNumber

const Letter = styled.span`
    animation: showLetter 0.1s ease forwards;
    

    &.animate {
      position: relative;
      opacity: 0;
      animation-delay: ${props => `${props.delay * 0.05}s`};
    }

    @keyframes showLetter {
      from {
        opacity: 0;
        top: 4rem;
      } to {
        opacity: 1;
        top: 0;
      }
    }
`;

const Paragraph = styled.p`
  width: 15rem;
  white-space: pre-line;
  position: relative;
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.3;
  color: ${props => props.theme === "dark" ? "#d9d9d9" : "rgb(2, 2, 2)"};
  letter-spacing: 0.3px;
  margin-top: 0.1rem;
  font-weight: ${props => props.theme === "dark" ? "normal" : "600"};

  &.show {
    &::after {
      display: none;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 90%;
    height: 100%;
    background: ${props => props.theme === "dark" ? "linear-gradient(to right, rgba(50, 50, 50, 0.5) 0%, rgba(50, 50, 50, 1) 10%)" : "linear-gradient(to right, rgba(249, 249, 249, 0.5) 0%, rgba(249, 249, 249, 1) 10%)"};
    top: 0;
    right: 0;
    display: block;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;

  &:first-of-type {
    align-self: flex-start;
  }
`;

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;

  ${Icon} {
    svg {
      font-size: 1rem;
    }
    
  }
`