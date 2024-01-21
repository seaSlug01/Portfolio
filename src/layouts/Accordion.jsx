import React, {useState} from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import { useSelector} from "react-redux";
import AccordionItem from '../components/AccordionItem';

function Accordion({header}) {
  const projects = useSelector(state => state.projects.projectsData.slice(0, 3))
  const theme = useSelector(state => state.theme.mode);

  const [expanded, setExpanded] = useState(null)

  const expand = (id = null) => {
    setExpanded(id)
  }

  return (
    <Wrapper>
      <Container theme={theme}>
        <Link to="/projects">
          <h1>{header}</h1>
        </Link>
        {projects.map((p, idx) => (<AccordionItem key={p.id} project={p} theme={theme} expanded={p.id === expanded} setExpand={expand} />))}
      </Container>
    </Wrapper>
  )
}

export default Accordion

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 5rem;
`;

const Container = styled.div`
  width: 55rem;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h1 {
    font-weight: 300;
    color: ${props => props.theme === "dark" ? "rgb(227, 227, 227)" : "black"};
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      height: 4px;
      width: 60%;
      background: rgb(75, 168, 255);
      border-radius: 5px;
    }
  }
`;