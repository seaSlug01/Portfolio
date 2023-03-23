import { Routes, Route } from 'react-router-dom';
import React, {useEffect, useCallback} from 'react'
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import Portal from "./pages/Portal";
import Header from "./layouts/Header"
import GlobalStyle from './GlobalStyle';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Project from './layouts/Project';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import {getWindowWidth} from "./utils/mediaQuery.js";

function App(props) {
  const dispatch = useDispatch();
  const {portal} = props;
  const dispatchSizeFn = useCallback(() => getWindowWidth(dispatch), [dispatch])
  dispatchSizeFn();

  useEffect(() => {
    
    const evt = window.addEventListener("resize", dispatchSizeFn)

    return () => {
      window.removeEventListener("resize", evt)
    }
  }, [dispatchSizeFn])
  
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/projects/:id" element={<Project/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Wrapper>
      {portal.show && <Portal portal={portal} />}
    </div>
  )
}

const mapStateToProps = ({portal}) => ({
  portal
})

export default connect(mapStateToProps, null, null)(App)

const Wrapper = styled.div`
  margin-top: 4rem;
`;
