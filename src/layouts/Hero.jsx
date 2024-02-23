import React, { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import Wheel from "./Wheel"
import Slider from "../components/Slider"
import ProjectPreview from "../components/ProjectPreview"
import SubmitButton from "../components/SubmitButton"
import { togglePortal } from "../store/portalSlice"
import { BsFillPeopleFill } from "react-icons/bs"
import Accordion from "./Accordion"
import HorizontalRule from "../components/HorizontalRule"
import { WheelContext } from "../context/Wheel"
import { heroHeaderShade, heroSubHeadingColors } from "../styles/colors"
import { heroVideoPathWebP, heroVideoPathMp4 } from "../db"

function Hero() {
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()
  const { color: wheelColor } = useContext(WheelContext)
  const mediaSize = useSelector((state) => state.mediaQuerySize.mediaSize)
  const projects = useSelector((state) =>
    state.projects.projectsData.slice(0, 3)
  )

  return (
    <>
      <Section>
        <Square>
          {mediaSize < 4 ? (
            <HeroVideo clasName="heroasdvideo">
              <video muted autoPlay loop>
                <source src={heroVideoPathWebP} type="video/webp" />
                <source src={heroVideoPathMp4} type="video/mp4" />
              </video>
            </HeroVideo>
          ) : (
            ""
          )}
          <Block theme={theme}>
            <Title theme={theme} shadeBG={heroHeaderShade[wheelColor]}>
              <h1 className="">Neelixmans Area</h1>
            </Title>
            <SubHeader
              theme={theme}
              mediaSize={mediaSize}
              spanColor={
                heroSubHeadingColors[mediaSize < 4 ? "dark" : theme][
                  mediaSize < 4 ? "blue" : wheelColor
                ]
              }
            >
              I'm a web development <span>enthusiast</span>, bringing genuine
              love for coding and design to create functional and{" "}
              <span>visually pleasing</span> websites. <br />
              Feel free to browse! ✨
            </SubHeader>
            <SubmitButton
              text="Contact"
              className="btn-contact"
              icon={<BsFillPeopleFill />}
              onClick={() =>
                dispatch(togglePortal({ show: true, component: "Contact" }))
              }
            />
          </Block>
        </Square>
        <Square className={theme === "dark" ? "dark" : "light"}>
          {mediaSize < 4 ? (
            <>
              <Slider />
              {projects.map((p, idx) => (
                <ProjectPreview
                  className={`preview-${idx}`}
                  key={p.id}
                  project={p}
                  theme={theme}
                />
              ))}
            </>
          ) : (
            <Wheel />
          )}
        </Square>
      </Section>
      {mediaSize >= 4 && (
        <>
          <div className="m-block m-block--5">
            <Slider />
          </div>
          <div className="responsive-padding d-flex justify-center align-center">
            <HorizontalRule theme={theme} />
          </div>
          <Accordion header="Projects" />
        </>
      )}
    </>
  )
}

export default Hero

const HeroVideo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
`

const Title = styled.div`
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 4.5rem;
    color: ${(props) => (props.theme === "dark" ? "#f3f3f3" : "black")};
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
    background: ${(props) => props.shadeBG};
    mix-blend-mode: darken;
    transform: translateY(80%);
    transition: 1s ease transform, 0.5s ease color;
    display: ${(props) => (props.theme === "dark" ? "block" : "none")};
  }

  @media (max-width: 1488px) {
    h1 {
      color: #f3f3f3;
      font-size: 4.5vw;
      margin-bottom: 0.9vw;
    }
  }

  @media (max-width: 750px) {
    h1 {
      font-size: 2rem;
    }
  }
`

const SubHeader = styled.p`
  color: ${(props) =>
    props.theme === "dark" ? "rgb(227 227 227)" : "#4c4c4c"};
  font-weight: ${(props) => (props.theme === "dark" ? "100" : "400")};
  font-size: 1.2rem;
  z-index: 1;

  &:first-of-type {
    line-height: 2;
  }

  small {
    font-size: 0.8rem;
  }

  span {
    transition: color 0.5s ease;
    color: ${(props) => props.spanColor};
    font-weight: ${(props) =>
      props.theme === "dark" ? "400" : props.mediaSize < 4 ? "400" : "500"};
  }
`

const Block = styled.div`
  width: 75%;

  &:hover {
    ${Title} {
      &::after {
        transform: translateY(0%);
      }
    }
  }

  .btn-contact {
    margin-top: 3rem;
    width: 50%;
    text-transform: uppercase;
    background: ${(props) => (props.theme === "dark" ? "#e6e6e6" : "black")};
    box-shadow: ${(props) =>
      props.theme === "dark"
        ? "#2px 10px 40px #646464"
        : "0 10px 40px #ababab"};

    span {
      mix-blend-mode: difference;
      color: #d1d1d1;
      letter-spacing: 1.4px;
    }

    &:hover {
      background: ${(props) => (props.theme === "dark" ? "#eeeeee" : "black")};
    }

    &::after {
      background: ${(props) =>
        props.theme === "dark" ? "#181818" : "#cbd3ff"};
    }
  }

  @media (max-width: 1488px) {
    margin-top: 4vw;

    p,
    .btn-contact {
      font-size: 0.9375rem;
    }

    .btn-contact {
      background: #e6e6e6;
      box-shadow: #2px 10px 40px #646464;

      &:hover {
        background: #eeeeee;
      }

      &::after {
        background: #181818;
      }
    }

    p {
      text-align: center;
      color: rgb(227 227 227);
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
`

const Square = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  overflow: hidden;

  &:nth-of-type(1) {
    padding-left: 10rem;
    align-items: center;
    position: relative;

    @media (max-width: 1480px) {
      padding-left: 0;
      height: 60vh;
      align-items: center;
      justify-content: center;
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${(props) => props.backgroundImage});
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

    &.dark {
      &::after,
      &::before {
        background-image: linear-gradient(
          to bottom,
          rgba(50, 50, 50, 0) 0,
          rgba(50, 50, 50, 0.15) 15%,
          rgba(50, 50, 50, 0.65) 29%,
          rgba(50, 50, 50, 0.78) 44%,
          rgba(50, 50, 50, 0.9) 44%,
          rgba(50, 50, 50, 1) 100%
        );
      }
    }

    &.light {
      &::after,
      &::before {
        background-image: linear-gradient(
          to bottom,
          rgba(50, 50, 50, 0) 0,
          rgba(249, 249, 249, 0.35) 15%,
          rgba(249, 249, 249, 0.65) 29%,
          rgba(249, 249, 249, 0.78) 44%,
          rgba(249, 249, 249, 0.9) 44%,
          rgba(249, 249, 249, 1) 100%
        );
      }
    }

    &::after,
    &::before {
      content: "";
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
      &::after,
      &::before {
        background: linear-gradient(
          rgba(50, 50, 50, 0) 0px,
          rgba(50, 50, 50, 0.5) 15%,
          rgba(50, 50, 50, 0.5) 29%,
          rgba(50, 50, 50, 1) 44%,
          rgba(50, 50, 50, 1) 44%,
          rgb(50, 50, 50) 100%
        );
        height: 8rem;
      }
    }

    @media (max-width: 1600px) {
      &::after,
      &::before {
        height: 13rem;
      }
    }

    @media (max-width: 1480px) {
      margin-top: 1rem;
      flex-direction: column;
      align-items: flex-start;

      &::after,
      &::before {
        height: 0;
      }

      .preview-0 {
        margin-top: 2rem;
      }
    }
  }
`

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
`
