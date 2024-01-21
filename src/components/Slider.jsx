import React, { useState, useRef, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import LazyLoad from 'react-lazy-load';
import throttle from "lodash.throttle"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {getEveryProjectsImages} from "../utils/utils";
import {togglePortal} from "../store/portalSlice";

const getMedia = (setSlider, slider) => {
  if(window.innerWidth > 1280) {
    return setSlider({
      ...slider,
      itemWidth: 15.366666666666667,
      visibleItems: 6,
      previewWidth: 2.5,
      totalTurns: Math.ceil(slider.items.length / 6)
    })
  }

  if(window.innerWidth < 1280 && window.innerWidth > 1100) {
    return setSlider({
      ...slider,
      itemWidth: 18.119999999999997,
      visibleItems: 5,
      previewWidth: 3.5,
      totalTurns: Math.ceil(slider.items.length / 5)
    })
  }

  if(window.innerWidth < 1100 && window.innerWidth > 800) {
    return setSlider({
      ...slider,
      itemWidth: 22.5,
      visibleItems: 4,
      previewWidth: 4,
      totalTurns: Math.ceil(slider.items.length / 4)
    })
  }


  if(window.innerWidth < 800) {
    return setSlider({
      ...slider,
      itemWidth: 29.46666666666667,
      visibleItems: 3,
      previewWidth: 5,
      totalTurns: Math.ceil(slider.items.length / 3)
    })
  }
}


function Slider() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const sliderItems = getEveryProjectsImages();
  const [slider, setSlider] = useState({
    items: sliderItems,
    turn: 1,
    visibleItems: 6,
    itemWidth: 15.366666666666667,
    gap: 0.4,
    previewWidth: 2.5,
    totalTurns: Math.ceil(sliderItems.length / 6)
  })
  const ref = useRef();


  useEffect(() => {
    getMedia(setSlider, slider)
    const resizer = throttle(() => getMedia(setSlider, slider), 250);
    const unsub = window.addEventListener("resize", resizer)

    return () => {
      window.removeEventListener("resize", unsub)
    }

  }, [])

  function slide(turnTo) {
    // About the widths...
    // -8 points for the 2 (preview items)
    // 6 visible items - 7 margins: -2.4
    // 100 - 10.4 = 89.2
    // 89.2 / 6 visible items => 14.8666


    let direction = turnTo > slider.turn ? "right" : "left", translateX;
    if(direction === "right") {

      if((turnTo) === slider.totalTurns && slider.items.length % ((turnTo - 1) * slider.visibleItems) > 0) {
        translateX = (slider.items.length - slider.visibleItems) * (slider.itemWidth + slider.gap) - slider.previewWidth;
      } else {
        translateX = (turnTo - 1) * (slider.visibleItems * (slider.itemWidth + slider.gap)) - slider.previewWidth;
      }
      
    } else {

      if(turnTo === 1) {
        translateX = -slider.previewWidth;
      } else { 
        translateX = (turnTo - 1) * (slider.visibleItems * (slider.itemWidth + slider.gap)) - slider.previewWidth;
      }

    }

    ref.current.style.transform = `translateX(${translateX * -1}%)`;
    
    setSlider({
      ...slider,
      turn: turnTo
    })

  }

  function setIndicators() {
    return Array.from(Array(slider.totalTurns), (el, index) => <Indication onClick={() => slide(index + 1)} key={index} className={index + 1 === slider.turn ? "active" : undefined} theme={theme} />)
  }

  function displayGallery(e, item, idx) {
    const {left, top, width, height} = e.target.getBoundingClientRect();

    // dispatch(setSelectedProject({id: projectId}))
    dispatch(togglePortal({show: true, component: "Gallery", cordinates: {left, top, width, height}, projectId: item.id, imageSRCs: item.images, gallery: sliderItems, index: idx }))
  }

  return (
    <Container>

      <Header>
        <Heading theme={theme}>Gallery</Heading>
        <Indicators>
          {
            setIndicators()
          }
        </Indicators>
      </Header>
      
      <SliderEl>
        

        {slider.turn !== 1 && 
          <Controller className="left" onClick={() => slide(slider.turn - 1)} width={slider.previewWidth}>
            <BsChevronLeft />
          </Controller>
        }

        <Items ref={ref} previewWidth={slider.previewWidth}>
          {slider.items.map((item, index) => (
            <Item key={index} index={index} gap={slider.gap} onClick={e => displayGallery(e, item, index)}>
              <LazyLoad>
                <Image src={item.images.preview} />
              </LazyLoad>
              
            </Item>
          ))}
        </Items>
        
        {slider.turn !== slider.totalTurns && 
        <Controller className="right" onClick={() => slide(slider.turn + 1)} width={slider.previewWidth}>
          <BsChevronRight />
        </Controller>
        } 
      </SliderEl>

    </Container>
  )
}

export default Slider

const Indicators = styled.div`
  display: flex;
  margin-right: 5%;
`;

const Indication = styled.button`
    height: 2rem;
    width: 2vw;
    position: relative;
    transition: all 0.3s linear;
    cursor: pointer;
    margin-left: 0.5rem;

    &:hover {
      width: 3vw;
    }

    &::after {
      content: "";
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      width: 90%;
      height: ${props => props.theme === "dark" ? "2px" : "2.5px"};
      background:${props => props.theme === "dark" ? "#a5a5a5" : "rgb(118 118 118)"};;
      pointer-events: none;
    }

    &.active {
      
      &::after {
        background: ${props => props.theme === "dark" ? "white" : "#ff4700"};
      }
    }


    @media (max-width: 1200px) {
      width: 1.5rem;

      &:hover {
        width: 2rem;
      }
    }
`;

const Controller = styled.button`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${props => `${props.width}%`};
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease;
  color: white;
  cursor: pointer;
  z-index: 1;
  opacity: 0;
  visibility: hidden;

  &:hover {
    svg {
      transform: scale(1.4);
    }
  }

  svg {
    font-size: 2rem;
    transition: transform 0.3s ease;
  }

  &.left {
    left: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &.right {
    right: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const Image = styled.img`
  transition: none;
`;

const Item = styled.div`
  overflow: hidden;
  width: 15.366666666666667%;
  height: 8.6vw;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: linear-gradient(to top, #1e1e1e, #4e4e4e);

  &:hover {
    ${Image} {
      transition: 5s transform linear, 2.5s filter linear;
      transform: scale(1.3);
      /* filter: invert(1); */
      animation: invert 2.5s linear forwards;
    }
  }

  @keyframes invert {
    0% {
      filter: invert(0);
    }
    50% {
      filter: invert(0.1);
    }
    51% {
      filter: invert(0.6)
    }

    100% {
      filter: invert(1);
    }
  }

  .LazyLoad {
    height: 100%;
  }

  &::after {
    content: "${props => props.index + 1}";
    position: absolute;
    font-size: 4.5vw;
    color: white;
    top: 0;
    left: 10px;
    text-shadow: 0 0 10px black;
  }


  margin-right: ${props => `${props.gap}%`};

  &:first-of-type {
    margin-left: ${props => `${props.gap}%`};
  }

  &:last-of-type {
    margin-right: 0%;
  }

  @media (max-width: 1280px) {
    width: 18.119999999999997%;
    height: 10.2vw;
  }

  @media (max-width: 1100px) {
    width: 22.5%;
    height: 14vw;
  }

  @media (max-width: 800px) {
    width: 29.46666666666667%;
    height: 17vw;
  }

`;

const Items = styled.div`
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${props => `${props.previewWidth}%`});
  position: relative;
`;



const Heading = styled.h2`
  font-size: 1.6vw;
  font-weight: 400;
  letter-spacing: 0.3px;
  color: ${props => props.theme === "dark" ? "white" : "black"};

  @media (max-width: 850px) {
    font-size: 1rem;
  }
`;

const Header = styled.div`
  padding-left: 3.5%;
  margin-bottom: 0.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1280px) {
    padding-left: 4.5%;

    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1100px) {
    padding-left: 5%;
  }

  @media (max-width: 800px) {
    padding-left: 6%;
  }
`;



const SliderEl = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  

  &:hover {
    ${Controller} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Container = styled.div`
  width: 100%;
`;