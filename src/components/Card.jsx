import React from 'react'
import styled from "styled-components";

import LearnMoreButton from './LearnMoreButton';
import {randomHeadingColor} from "../utils/utils";
import { ColorHeading } from '../styles/reusableStyles';

function Card({image, heading, details, theme}) {
  return (
    <Container theme={theme}>
      <Image src={image} alt={heading} />
      <div className="text">
        <ColorHeading className={heading.color || randomHeadingColor()} theme={theme}>{heading.text}</ColorHeading>
          <p>{details.text}</p>
        <LearnMoreButton text="Learn more" tabIndex={-1} />
      </div>
      
    </Container>
  )
}

export default Card

const Container = styled.div`
  padding: 0.8rem;
  border-radius: 1rem;
  width: 19rem;
  background: ${props => props.theme === "dark" ? "rgb(64 64 64)" : "#262626"};;
  box-shadow: ${props => props.theme === "dark" ? "0 20px 40px #202020" : "rgb(139, 139, 139) 0px 5px 10px" };
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme === "dark" ? "0 20px 40px #202020" : "10px 10px 10px #8b8b8b" };
  }

  button {
    margin-top: 1rem;
    align-self: flex-end;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    color: silver;
    padding-inline: 0.5rem;

    p {
      line-height: 1.4;
      font-size: 0.935rem;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /* start showing ellipsis when 3rd line is reached */
      white-space: pre-wrap; /* let the text wrap preserving spaces */
      overflow: hidden;
    }

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: 14rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;