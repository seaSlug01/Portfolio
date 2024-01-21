import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import {togglePortal} from "../store/portalSlice";
import ReactDom from 'react-dom';
import {useSelector} from "react-redux";
import styled from "styled-components";


import Project from '../layouts/Project';
import Contact from '../pages/Contact';
import Gallery from "../layouts/Gallery";
import CloseIcon from "../components/CloseIcon";
import { setIsRunning } from '../store/setIntervalSlice';

const modalTargetComponents = {
  Project,
  Contact,
  Gallery
}

function Portal() {
  const dispatch = useDispatch();
  const portal = useSelector(state => state.portal);
  const {component, cordinates} = portal;

  const [initialTarget, setInitialTarget] = useState(null);

  const closePortal = () => dispatch(togglePortal({show: false, component: null, cordinates: {} }))
  
  const renderModal = () => {
    if(component) {
      const SelectedComponent = modalTargetComponents[component];

      return <SelectedComponent closePortal={closePortal} className="portal-content" cordinates={cordinates} {...portal} onMouseDown={e => e.stopPropagation()}/>
    }
  }

  useEffect(() => {
    dispatch(setIsRunning({isRunning: false, name: "wheel"}))

    return () => {
      dispatch(setIsRunning({isRunning: true, name: "wheel"}))
    }
  }, [dispatch])

  return ReactDom.createPortal(
    <Container
      onMouseDown={(e) => setInitialTarget(e.target)}
      onMouseUp={(e) => {
        if(e.target === initialTarget) {
          closePortal();
        }
      }}
    >
      <CloseIcon />
      {renderModal()}
    </Container>,
    document.getElementById('portal')
  )
}

export default Portal


const Container = styled.div`
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0000007a;
  animation: fade 0.3s ease forwards;
  

  & > div {
    position: absolute;
  }

  @keyframes fade {
    from {
      opacity: 0;
    } to {
      opacity: 1;
    }
  }

  
  @media (max-width: 600px) {
    background: rgba(50 50 50, 0.5);
    backdrop-filter: blur(2px);
    & > div {
      padding: 0.5rem;
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
`;