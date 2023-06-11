import React, { useState, useRef, useEffect } from 'react'
import styled, {keyframes} from "styled-components";
import LearnMoreButton from './LearnMoreButton';

function AccordionItem({project, theme, expanded, setExpand}) {
  const ref = useRef(null);
  const [height, setHeight] = useState({
    headingHeight: 0,
    bodyHeight: 0,
  });
  const [isFocused, setIsFocused] = useState(false);

  const {headingHeight, bodyHeight} = height;
  const animationSpeed = 1;

  useEffect(() => {
    if(ref.current) {
      setHeight({
        headingHeight: ref.current.querySelector(".accordion__header h2").offsetHeight,
        bodyHeight: ref.current.querySelector(".accordion__body").offsetHeight,
      });
    }

    console.log()
  }, [])

  function toggle(e) {
    e.target.tagName !== "a" && setExpand(expanded ? null : project.id)
  }


  return (
    <Wrapper onClick={toggle} expanded={expanded} bodyHeight={bodyHeight} headingHeight={headingHeight} animationSpeed={animationSpeed} theme={theme} tabIndex={expanded ? -1 : 0} onKeyDown={(e) => {
      e.key === "Enter" && toggle(e)
    }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <Container ref={ref}>
        <Header className="accordion__header" expanded={expanded} theme={theme}>
          <Image theme={theme} className={`gradient ${project.heading.color}`} expanded={expanded} transitionSpeed={(1 - (bodyHeight + headingHeight) / (bodyHeight + headingHeight + 320)) * animationSpeed} delay={expanded ? 0 : ((bodyHeight - headingHeight) / (bodyHeight + headingHeight + 320)) * (animationSpeed)}>
            <img src={project.images[0].src.medium} alt={project.images[0].src.medium} />
          </Image>
          <h2 className={project.heading.color}>{project.heading.text}</h2>
        </Header>
       
       <Body className="accordion__body" theme={theme}>
          <p>{project.textFields[0].text}</p>
          <LearnMoreButton text="Learn More" as="a" href={`/projects/${project.id}`} tabIndex={expanded ? 0 : -1} />
        </Body>
      </Container>
    </Wrapper>
  )
}

export default AccordionItem

const expand = (startHeight, endHeight) => keyframes`
  0% {
    height: ${startHeight};
  } 30% {
  } 100% {
    height: ${endHeight};
  }
`


const shrink = (startHeight, endHeight) => keyframes`
  0% {
    height: ${startHeight};
  } 70% {
    height: ${endHeight};
  } 100% {
    height: ${endHeight};
  }
`

const Header = styled.div`
  h2 {
    padding: 1rem;
    font-weight: ${props => props.theme === "dark" ? 200 : 300};
    transition: color 1s ease;
    background: ${props => props.theme === "dark" ? "rgb(64, 64, 64)" : ""};
    border-bottom: thin solid ${props => props.expanded ? "grey" : "transparent"};

    &.blue {
      color: ${props => props.expanded ? "rgb(142 233 255)" : "rgb(227, 227, 227)"};
    }

    &.violet {
      color: ${props => props.expanded ? "rgb(243 194 255)" : "rgb(227, 227, 227)"};
    }

    &.orange {
      color: ${props => props.expanded ? "rgb(255 165 130)" : "rgb(227, 227, 227)"};
    }
  }
`;

const Body = styled.div`
  padding: 1rem;
  color: "rgb(227, 227, 227)";
  display: flex;
  flex-direction: column;
  

  p {
    line-height: 1.6;
    font-weight: 400;
    font-size: 0.9375rem;
  }

  a {
    align-self: flex-end;
    margin-top: 3rem;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 0.9375rem;
    letter-spacing: 1.3px;
  }
`;

const Image = styled.div`
  height: ${props => props.expanded ? "20rem" : "6rem"};
  transition: all ${props => `${props.transitionSpeed}s`} ease;
  position: relative;
  transition-delay: ${props => `${props.delay}s`};

  img {
    object-fit: cover;
  }

  &::after {
    opacity: ${props => props.expanded ? 0 : props.theme === "dark" ? 1 : 0.8};
    transition: opacity ${props => `${props.transitionSpeed}s`} ease;
    transition-delay: ${props => `${props.delay}s`};
  }

  &.violet {
    background: linear-gradient(to top, rgb(255 44 255 / 37%), transparent);
  }

  &.orange {
    background: linear-gradient(to top, rgb(255 72 0 / 54%), transparent);
  }
`;

const Container = styled.div``;

const Wrapper = styled.div`
  --img-min-height: 96;
  --img-max-height: 320;

  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: ${props => props.headingHeight + 96};
  animation: ${props => props.expanded ? expand(`${props.headingHeight + 96}px`, `${props.headingHeight + 320 + props.bodyHeight}px`) : shrink(`${props.headingHeight + 320 + props.bodyHeight}px`, `${props.headingHeight + 96}px`)} ${props => `${props.animationSpeed}s`} ease forwards;
  box-shadow: 0px 5px 10px ${props => props.theme === "dark" ? "rgb(32, 32, 32)" : "rgb(139, 139, 139)"}; 
  transition: 0.6s transform ease;
  

  background: ${props => props.theme === "dark" ? "transparent" : "rgb(53 53 53)"};
  /* background: rgb(64, 64, 64); */
  &:active {
    outline: 1px solid ${props => props.theme === "dark" ? "silver" : "black"};
  }

  &:hover {
    transform: translateY(-5px);
  }

`;