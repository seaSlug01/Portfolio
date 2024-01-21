import React from 'react'
import {useParams, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styled, {keyframes} from "styled-components";
import Carousel from "../components/Carousel";
import LearnMoreButton from "../components/LearnMoreButton";
import HorizontalRule from '../components/HorizontalRule';
import { RxChevronLeft } from "react-icons/rx";
import { BsChevronRight } from "react-icons/bs";
import {setSelectedProject} from "../store/projectsSlice";
import {randomHeadingColor} from "../utils/utils";
import { ColorHeading } from '../styles/reusableStyles';
import {projects} from "../db";



function Project({projectData, lazyLoad, ...rest}) {
  const dispatch = useDispatch();
  const {id} = useParams();

  const theme = useSelector(state => {
    if(Boolean(projectData) || id) return state.theme.mode;
    
    return "dark"
  });

  const project = useSelector(state => {
    if(projectData) return projectData
    if(id) return projects.find(p => p.id.toString() === id);

    return state.projects.selectedProject
  });


  const allProjects = useSelector(state => state.projects.projectsData);

  const getNextProjectId = (goTo) => {
    const curIndex = allProjects.findIndex(p => p.id === project.id);
    const targetIndex = curIndex + goTo;

    if(targetIndex > allProjects.length - 1 || targetIndex < 0) {
      return allProjects[targetIndex > 0 ? 0 : allProjects.length - 1].id
    }

    return allProjects[targetIndex].id
  }

  const changeProject = (e, direction) => {
    e.target.closest(".modal-wrapper").scrollTop = 0;

    const id = getNextProjectId(direction === "next" ? 1 : -1)
    dispatch(setSelectedProject({id}))
  }

  function createTags(field) {
    const heading = <span className="tag-heading" key={field.header}>{field.header}:</span>

    const fields = <ul key={crypto.randomUUID()} className="tags">{field.listItems.map((item, index) => (<li key={`${item}-${index}`} className="listItem">{item}</li>))}</ul>

    return [heading, fields]
  }

  function addDetails() {
    return project.textFields.map((field, index) => {
      switch(field.type) {
        case "p":
          return <p key={index}>{field.text}</p>
        case "tags":
          return <Tags key={index} theme={theme}>{createTags(field)}</Tags>
        case "h2":
          return projectData || id ? 
            <ColorHeading key={index} className={project.heading.color || undefined} as="h2" theme={theme}>{field.text}</ColorHeading> : 
            <h2 key={index}>{field.text}</h2>
        case "a":
          return <Visit key={index} href={field.href} theme={theme} target="_blank" className={project.heading.color || undefined}><span>{field.text}</span><BsChevronRight /></Visit>
        default: 
          return "";
      }
    })
  }

  const Container = projectData || id ? Big : Small

  return (
    <Container {...rest} theme={theme}>
      <Wrapper className={`${projectData ? undefined : "modal-wrapper"}`}>
        <Carousel images={project.images} isSmall={projectData || id ? false : true} color={project.heading.color} lazyLoad={lazyLoad} theme={theme} projectId={project.id} />
        <Details>
          <ColorHeading className={project.heading.color || randomHeadingColor()} theme={theme}>
            {project.href 
              ? <a href={project.href} target="blank">{project.heading.text}</a> 
              : project.heading.text
            }
            
            
            </ColorHeading>
          {addDetails()}

          {(!projectData || id) && (
            <Controls theme={theme}>
              <LearnMoreButton as={id ? Link : "button"} to={`/projects/${getNextProjectId(-1)}`} iconPosition="left" icon={<RxChevronLeft />} onClick={(e) => changeProject(e, "prev")} text="Previous" />
              <LearnMoreButton as={id ? Link : "button"} to={`/projects/${getNextProjectId(1)}`} onClick={(e) => changeProject(e, "next")} text="Next" />
            </Controls>
          )}
        </Details>
      </Wrapper>
      {projectData ? <HorizontalRule className="hr" theme={theme} /> : undefined}
    </Container>
  )
}

export default Project

const Wrapper = styled.div`
  width: 100%;
`;

const Visit = styled.a`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: ${props => props.theme === "dark" ? "300" : "400"};;
  color: ${props => props.theme === "dark" ? "#f3f3f3" : "rgb(2, 2, 2)"};
  position: relative;
  margin-top: 2rem;
  align-self: flex-start;
  display: flex;
  align-items: center;

  svg {
    font-size: 0.8rem;
    display: none;
  }

  span {
    position: relative;
    transition: letter-spacing 0.3s linear;
  }

  &:hover {
    color: ${props => props.theme === "dark" ? "white" : "black"};;
    

    span {
      letter-spacing: 2.2px;
    }

    svg {
      display: block;
    }
    &::after {
      width: 100%;
      height: ${props => props.theme === "dark" ? "1px" : "2px"};
    }

    &.blue {
      &::after {
        background: #6ac8ff;
      }
      
    }

    &.orange {
      &::after {
        background: orange;
      }
      
    }

    &.violet {
      &::after {
        background: violet;
      }
      
    }

    &.green {
      &::after {
        background: limegreen;
      }
      
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    height: 1px;
    width: 60%;
    background: ${props => props.theme === "dark" ? "white" : "black"};;
    transition: 0.3s linear all;
  }
`;

const Tags = styled.div`
  display: flex;

  &:not(:first-of-type) {
    margin-top: -0.5rem;
  }

  .tag-heading {
    color: ${props => props.theme === "dark" ? "white" : "rgb(2, 2, 2)"};
    font-weight: ${props => props.theme === "dark" ? 400 : 600};
    margin-right: 1.2rem;
    align-self: flex-start;

  }

  .tags {
    display: inline-flex;
    gap: 0 1rem;
    flex-wrap: wrap;
    list-style-type: none;

    .listItem {
      position: relative;
      color: ${props => props.theme === "dark" ? "rgb(217, 217, 217)" : "rgb(2, 2, 2)"};

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: calc(-0.5rem - 2px);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgb(120 120 120);
      }
    }
  }
`;


const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: #dddddd;
    margin-top: 1rem;
    margin-bottom: -0.25rem;
  }
`;

const ExtendedStyles = styled.div`
  z-index: 1;

  h1 {
    color: white;
  }

  p {
    color: ${props => props.theme === "dark" ? "rgb(217 217 217)" : "#020202"};
  }
`;

const scaleUp = (top, left, scale) => keyframes`
  from {
    top: ${top}px;
    left: ${left}px;
    transform: scale(${scale});
    opacity: 1;
  } to {
    transform: translateX(-50%) scale(1);
    top: 4.7rem;
    left: 50%;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;

  svg {
    font-size: 1rem;
  }

  button {
    padding-inline: 0;
    padding-block: 0.5rem;
  }

  a {
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 0.9rem;
    color: ${props => props.theme === "dark" ? "rgb(211, 211, 211)" : "black"};
    font-weight: ${props => props.theme === "dark" ? "300" : "500"};
    transition: color 0.3s ease;
    margin-bottom: 1rem;
    margin-top: 8rem;
    
    &:hover {
      
      color: ${props => props.theme === "dark" ? "white" : "black"};
    }

    svg {
      top: 3px;
    }

    &:nth-of-type(1) {
      padding-left: 0;
    }

    &:nth-of-type(2) {
      padding-right: 0;
    }
  }
`;

const Small = styled(ExtendedStyles)`
  width: 33.5rem;
  margin-bottom: 0;
  animation: ${props => scaleUp(props.cordinates.top, props.cordinates.left, props.cordinates.width / 500)} 0.5s ease-in-out forwards;
  transform-origin: 0 0;
  background: rgb(62, 62, 62, 0.5);
  backdrop-filter: blur(2px);
  border: 1px solid #6464644d;
  border-radius: 1rem;
  overflow: hidden;

  ${Wrapper} {
    max-height: 85vh;
    overflow-y: auto;

    /* &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #25252
      border-radius: 10px;
      background-color: #25252
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #9c9c9c;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #5a5a5a;
    } */
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  ${Details} {
    padding: 1rem;

    p, ${Tags}, ${Visit} {
      font-size: 0.9rem;
    }

    p {
      line-height: 1.3;
    }
  }
`;

const Big = styled(ExtendedStyles)`
  width: 100%;
  height: 100%;
  padding-inline: 10rem;
  

  &:first-of-type {
    margin-top: 8rem;
  }

  .hr {
    margin-block: 10rem;

    @media(max-width: 775px) {
      margin-block: 5rem;
    }
  }

  ${Wrapper} {
    display: flex;

    & > div {
      width: 50%;
    }
  }

  h1 {
    font-size: 3rem;
    font-weight: 300;
  }

  h2 {
    font-weight: 400;
  }

  ${Details} {
    padding-inline: 4rem;

    @media (max-width: 1700px) {
      padding-inline: 2rem;
    }

    p, ${Tags}, ${Visit} {
      font-size: 0.935rem;
      line-height: 1.4;
    }

  }

  @media (max-width: 1550px) {
    padding-inline: 8vw;
  }

  @media (max-width: 800px) {
    padding-inline: 1rem;
  }

  @media (max-width: 1200px) {

    ${Details} {
      h2 {
        font-size: 1.3rem;
      }

      h1${ColorHeading} {
        font-size: 2rem;
      }
    }

    ${Wrapper} {
      flex-direction: column;
      gap: 3rem;

      & > div {
        width: 100%;
      }
    }
  }

  @media (max-width: 975px) {
    ${Details} {
      padding-inline: 1rem
    }
  }

  @media (max-width: 500px) {
    ${Details} {
      padding-inline: 0;
    }
  }
`;