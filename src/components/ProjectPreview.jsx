import React, {useState} from 'react'
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import styled from "styled-components";
import LearnMoreButton from './LearnMoreButton';
import {ColorHeading} from "../styles/reusableStyles";
import HorizontalRule from '../components/HorizontalRule';


function ProjectPreview({project, theme, ...props}) {
  const [textSlice, setTextSlice] = useState(true)

  const sliceText = () => {
    var textLen = project.textFields[0].text.split(" ").length;

    if(textLen > 29) {
      return project.textFields[0].text.split(" ").slice(0, 29).join(" ") + "..."
    }
    
    return project.textFields[0].text

  }

  return (
    <Container {...props}>
      <Image className={`gradient ${project.heading.color}`} as={Link} to={`/projects/${project.id}`} theme={theme}>
        <LazyLoad>
          <img src={project.images[0].src.medium} alt={project.images[0].src.medium} />
        </LazyLoad>
      </Image>
      <Block theme={theme}>
        <div className="details">
          <ColorHeading as="h2" className={project.heading.color} theme={theme}>
            {project.heading.text}
          </ColorHeading>
          <p onClick={() => setTextSlice(!textSlice)} className={project.textFields[0].text.split(" ").length > 29 ? "cPointer" : undefined}>
            {
              textSlice ? sliceText() : project.textFields[0].text
            }
          </p>
          <LearnMoreButton as={Link} to={`/projects/${project.id}`} text="Learn more" />
        </div> 
      </Block>
      <HorizontalRule className="hr" />
    </Container>
  )
}

export default ProjectPreview

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .details {
    width: 80%;
    h2 {
      font-weight: 400;
      font-size: 1.7rem;
      /* text-transform: uppercase; */
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1.5rem;
      line-height: 1.3;

      &.cPointer {
        cursor: pointer;
      }
      
    }

    a, p {
      font-size: 0.9rem;
      color: ${props => props.theme === "dark" ? "#dfdfdf" : "rgb(2,2,2)"};
    }

    a {
      padding-left: 0;
      text-transform: uppercase;
      font-weight: ${props => props.theme === "dark" ? "300" : "500"};

      &:hover {
        color: ${props => props.theme === "dark" ? "white" : "black"};
      }
    }

    @media (max-width: 950px) {
      h2 {
        font-size: 1.4rem;
      }
    }

    @media (max-width: 800px) {
      h2 {
        font-size: 1.2rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 750px) {
      width: 95%;
    }
  }

  
`;

const Image = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;


  .LazyLoad {
    opacity: 0;
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
    transition: opacity 1s ease-in-out, width 0.3s ease, height 0.3s ease;

    &.is-visible {
      opacity: 1;
    }
  }

  
  
  img {
    aspect-ratio: 16/12;
    border-radius: 0.5rem;
    transition: 0.3s all ease;
    border-bottom: ${props => props.theme === "dark" ? "none" : "1px solid #c3c3c3"};
    border-left: ${props => props.theme === "dark" ? "none" : "1px solid #c3c3c3"};
    border-right: ${props => props.theme === "dark" ? "none" : "1px solid #c3c3c3"};
  }

  &::after {
    transition: 0.5s ease opacity;
    opacity: 1;
    pointer-events: none;
    border-radius: 1rem;
  }

  &.blue {
    &::after {
      background: linear-gradient(to top, rgb(0, 132, 255, ${props => props.theme === "dark" ? "0.6" : "0.8"}), transparent);
    }
  }

  &.violet {
    &::after {
      background: linear-gradient(to top, rgba(255, 44, 255, ${props => props.theme === "dark" ? 0.37 : 0.57}), transparent);
    }
  }

  &.orange {
    &::after {
      background: linear-gradient(to top, rgba(255, 72, 0, ${props => props.theme === "dark" ? 0.298 : 0.55}), transparent);
    }
  }

  &.green {
    &::after {

    }
  }

  &:hover {
    &::after {
      opacity: 0;
    }
    
    .LazyLoad {
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 750px) {
    height: 15rem;

    .LazyLoad {
      height: calc(100% - 1.5rem);
      width: calc(100% - 1.5rem);
    }
  }
`;

const Container = styled.div`
  padding-inline: 10rem;
  display: flex;
  width: 100%;
  height: 35vw;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 5rem;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }

  .hr {
    display: none;
  }

  &:nth-of-type(odd) {
    flex-direction: row-reverse;
  }

  ${Image}, ${Block} {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  @media (max-width: 1480px) {
    padding-inline: 3%;
  }

  @media (max-width: 1280px) {
    padding-inline: 3.5%;
  }

  @media (max-width: 1100px) {
    padding-inline: 4%;
  }

  @media (max-width: 800px) {
    padding-inline: 5%;
  }

  @media (max-width: 750px) {
    height: auto;
    gap: 1rem;

    &:not(:last-of-type) {
      .hr {
        display: block;
        bottom: -2rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
      }
    }

    

    &:nth-of-type(even), &:nth-of-type(odd) {
      flex-direction: column;
    }
    
    ${Image}, ${Block} {
      width: 100%;
    }
  }
`;