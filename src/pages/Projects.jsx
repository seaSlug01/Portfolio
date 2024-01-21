import React from 'react'
import {useSelector} from "react-redux";
import styled from "styled-components";
import Project from '../layouts/Project';
import Slider from "../components/Slider"

function Projects() {
  const projects = useSelector(state => state.projects.projectsData);
  
  return (
    <Container>
      {
        projects.map((p, idx) => <Project key={p.id} projectData={p} lazyLoad={idx !== 0} />)
      }
      <div className="m-block m-block--5">
        <Slider /> 
      </div>
    </Container>
  )
}

export default Projects

const Container = styled.div``;