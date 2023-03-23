import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import Wheel from "./Wheel";
import Slider from "../components/Slider";
import ProjectPreview from '../components/ProjectPreview';
import SubmitButton from "../components/SubmitButton";
import { togglePortal } from '../store/portalSlice';
import {BsFillPeopleFill} from "react-icons/bs";

function Hero() {
  const dispatch = useDispatch();
  const mediaSize = useSelector(state => state.mediaQuerySize.mediaSize)
  const projects = useSelector(state => state.projects.projectsData.slice(0, 3))

  return (
    <Section>
      <Square backgroundImage="/assets/3-small.jpg">
        <Block>
          <Title>
            <h1>Neelixmans Area</h1>
          </Title>
          <p>Hi, I'm Neelix, a web developer enthousiast.</p>
          <p>This website is a representation of some of my works. Feel free to browse.</p>
          <SubmitButton text="Contact" className="btn-contact" icon={<BsFillPeopleFill />} onClick={() => dispatch(togglePortal({show: true, component: "Contact"}))} />
        </Block>
      </Square>
      <Square>
        {mediaSize < 4 ? 
          <>
            <Slider />
            {projects.map((p, idx) => (<ProjectPreview className={`preview-${idx}`} key={p.id} project={p} />))}
          </>
        : <Wheel />}
      </Square>
    </Section>
  )
}

export default Hero

const Title = styled.div`
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 4.5rem;
    color: #f3f3f3;
    margin-bottom: 1rem;
    letter-spacing: 3px;
    font-weight: 300;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0px;
    background: #94adff;
    mix-blend-mode: darken;
    transform: translateY(80%);
    transition: 1s ease transform;
  }

  @media (max-width: 1488px) {
    
    h1 {
      font-size: 4.5vw;
      margin-bottom: 0.9vw;
    }
  }

  @media (max-width: 750px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const Block = styled.div`
  width: 75%;

  &:hover {
    ${Title} {
      &::after {
        transform: translateY(0%);
      }
    }
  }

  p {
    color: rgb(227 227 227);

    &:first-of-type {
      line-height: 1.6;
    }

    span {
      display: block;
    }
  }

  .btn-contact {
    margin-top: 3rem;
    width: 50%;
    text-transform: uppercase;
    background: #e6e6e6;
    box-shadow: 2px 10px 40px #646464;
    

    span {
      mix-blend-mode: difference;
      color: #d1d1d1;
      letter-spacing: 1.4px;
    }

    &:hover {
      background: #eeeeee;
    }

    &::after {
      background: #181818;
    }
  }

  @media (max-width: 1488px) {
    margin-top: 4vw;

    p, .btn-contact { 
      font-size: 0.9375rem;
    }

    p {
      text-align: center;
    }

    .btn-contact {
      width: 25%;
      margin-top: 3vw;
    }
  }

  @media (max-width: 850px) {
    .btn-contact {
      width: 9rem;
    }
  }


  
`;

const Square = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  overflow: hidden;

  
  &:nth-of-type(1) {
    padding-left: 10rem;
    align-items: center;

    @media (max-width: 1480px) {
      padding-left: 0;
      height: 60vh;
      align-items: center;
      justify-content: center;
      background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${props => props.backgroundImage});
      background-attachment: fixed;
      height: 42vw;

      ${Block} {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    @media (max-width: 1200px) {
      height: 58vh;
    }

    @media (max-width: 850px) {
      height: 50vh;
    }
    
  }

  &:nth-of-type(2) {
    align-items: center;


    &::after, &::before {
      content: "";
      background-image: linear-gradient( to bottom, rgba(50, 50, 50, 0) 0,
        rgba(50, 50, 50, 0.15) 15%,
        rgba(50, 50, 50, 0.65) 29%,
        rgba(50, 50, 50, 0.78) 44%,
        rgba(50, 50, 50, 0.9) 44%,
        rgba(50, 50, 50, 1) 100% );
      width: 100%;
      height: 3rem;
      position: absolute;
      z-index: 10;
    }

    &::before {
      bottom: 0;
    }


    &::after {
      transform: rotate(180deg);
      top: 0;
    }

    @media (max-width: 1800px) {
      &::after, &::before {
        background: linear-gradient(rgba(50, 50, 50, 0) 0px, rgba(50, 50, 50, 0.5) 15%, rgba(50, 50, 50, 0.5) 29%, rgba(50, 50, 50, 1) 44%, rgba(50, 50, 50, 1) 44%, rgb(50, 50, 50) 100%);
        height: 8rem;
      }
    }

    @media (max-width: 1600px) {
      &::after, &::before {
        height: 13rem;
      }
    }

    @media (max-width: 1480px) {
      margin-top: 1rem;
      flex-direction: column;
      align-items: flex-start;

      &::after, &::before {
        height: 0;
      }

      .preview-0 {
        margin-top: 2rem;
      }
    }
  }
`;

const Section = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 4rem);

  @media (max-width: 1480px) {
    flex-direction: column;
    margin-top: -4rem;
    height: auto;

    ${Square} {
      width: 100%;
    }
  }
`;

