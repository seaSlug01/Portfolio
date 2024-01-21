import styled from "styled-components";

export const Label = styled.label`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 0.7rem;
  letter-spacing: 3px;
  font-family: "Roboto", sans-serif;
  color: ${props => props.theme === "dark" ? "white" : "rgb(2, 2, 2)"};
  font-weight: ${props => props.theme === "dark" ? "normal" : "bold"};
    
`;

export const FieldIcon = styled.div`
margin-right: 1rem;

  svg {
    font-size: 1.5rem;
    color: ${props => props.theme === "dark" ? "silver" : "rgb(36 36 36)"};
  }
`;


export const Error = styled.small`
  margin-top: 0.5rem;
  color: ${props => props.theme === "dark" ? "rgb(255 136 109)" : "red"};
  font-weight: bold;
  letter-spacing: 1.5px;
  display: block;
  animation: flex 0.15s ease-in forwards;
  overflow: hidden;
  height: 0; 

  @keyframes flex {
    from {
      height: 0x;
    } to {
      height: 1rem;
    }
  }
`;


export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  border-bottom: 1px solid ${props => props.theme ? "#8b8b8b" : "rgb(36 36 36)"};
  padding-bottom: 0.2rem;
  width: 100%;
  position: relative;

  &::after, &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    height: 2px;
    transition: transform 0.3s ease, width 0.6s ease;
  }

  &::after {
    background: ${props => props.theme === "dark" ? "#ff8484" : "#ff3b3b"};
    width: 0;
  }

  &::before {
    background: ${props => props.theme === "dark" ? "silver" : "black"};
    width: 100%;
    transform: scaleX(0);
  }

  &.error {
    &::after {
      width: 100%;
    }
  }

  &.focus {
    &::before {
      transform: scaleX(1);
    }
  }
`;


export const ColorHeading = styled.h1`
  background-image: ${props => props.theme === "dark" ? "linear-gradient(45deg, #6ea0ff, #b4ceff)" : "linear-gradient(45deg, rgb(73 129 237), rgb(68 127 237))"};
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1200px) {
    font-weight: ${props => props.theme === "dark" ? "300" : "400"} !important;
  }

  &.blue {
    background-image: ${props => props.theme === "dark" ? "linear-gradient(45deg, #6ea0ff, #b4ceff)" : "linear-gradient(45deg, rgb(73 129 237), rgb(68 127 237))"};
  }

  &.violet {
    background-image: ${props => props.theme === "dark" ? "linear-gradient(45deg, rgb(190, 157, 255), rgb(211 162 255 / 96%))" : "linear-gradient(45deg, rgb(166 124 249), rgb(166 124 249))"};
  }

  &.orange {
    background-image: ${props => props.theme === "dark" ? "linear-gradient(45deg, rgb(255, 150, 110), rgb(255 110 110))" : "linear-gradient(45deg, rgb(255 112 57), rgb(255 112 57))"};
  }

  &.green {
    background-image: ${props => props.theme === "dark" ? "linear-gradient(45deg, rgb(110 255 175), rgb(110 255 188 / 32%))" : "linear-gradient(45deg, rgb(63 149 101), rgb(99 171 131))"};
  }
`