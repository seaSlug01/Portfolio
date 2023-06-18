import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components";
import {RxCaretRight, RxCaretLeft} from "react-icons/rx";
import LazyLoad from 'react-lazy-load';
import { togglePortal } from '../store/portalSlice';

const activeOutlineColors = {
  blue: "#7099f9",
  violet: "#c564ff",
  orange: "#ff7b2b",
  green: "#7eab6b"
}

function Carousel({images, projectId, isSmall, color, lazyLoad, theme}) {
  const dispatch = useDispatch();
  const {imageSize, mediaSize} = useSelector(state => state.mediaQuerySize)
  const [selectedImage, setSelectedImage] = useState({src: images[0].src[imageSize], index: 0 })

  useEffect(() => {
    setSelectedImage({src: images[0].src[imageSize], type: images[0].type, index: 0})
  }, [imageSize, setSelectedImage, images])
 
  const [previousSelectedImage, setPreviousSelectedImage] = useState({});

  const arrowSelection = (e, currentImageIndex) => {
    const direction = e.target.dataset.to;

    let targetImageIndex = direction === "next" ? currentImageIndex + 1 : currentImageIndex - 1;

    if(targetImageIndex > images.length - 1 || targetImageIndex < 0) {
      targetImageIndex = direction === "next" ? 0 : images.length - 1;
    }

    return {direction, targetImageIndex}
  }

  const imageClickedSelection = (e, currentImageIndex) => {
    if(e.target.src === selectedImage.src) e.preventDefault();

    const targetImageIndex = e.target.dataset.to;
    const direction = targetImageIndex > currentImageIndex ? "next" : "prev";

    return {direction, targetImageIndex}
  }

  const selectImage = (e, callback) => {
    if(Object.keys(previousSelectedImage).length) return;
    const currentImageIndex = images.findIndex(img => img.src[imageSize] === selectedImage.src);

    const {direction, targetImageIndex} = callback(e, currentImageIndex);
    imageAnimation(direction, targetImageIndex);
  }

  const imageAnimation = (direction, targetImageIndex) => {
    let prevStyles = {
      animation: `${direction === "next" ? "slideLeft" : "slideRight"} 0.75s ease forwards`
    }

    let currentStyles = {
      left: direction === "next" ? "100%" : "-100%",
      animation: `${direction === "next" ? "slideLeft" : "slideRight"} 0.75s ease forwards`
    };

    setPreviousSelectedImage({...selectedImage, styles: prevStyles})

    const currentSelectedImage = images[targetImageIndex];
    setSelectedImage({src: currentSelectedImage.src[imageSize], type: currentSelectedImage.type, styles: currentStyles, index: targetImageIndex});
    

    setTimeout(() => {
      setPreviousSelectedImage({})
      setSelectedImage({...selectedImage, src: currentSelectedImage.src[imageSize], type: currentSelectedImage.type, styles: {left: 0}, index: targetImageIndex })
    }, 750)
  }

  function loadPicture() {
    if(lazyLoad) {
      return <LazyLoad offset={300}>
                <Picture src={selectedImage.src} style={selectedImage.styles} objectFit={selectedImage.type} onClick={displayGallery}/>
            </LazyLoad>
    }

    return <Picture src={selectedImage.src} style={selectedImage.styles} objectFit={selectedImage.type} onClick={displayGallery} />
  }

  function displayGallery(e) {
    if(isSmall) return;
    const {left, top, width, height} = e.target.getBoundingClientRect();


    dispatch(togglePortal({show: true, component: "Gallery", cordinates: {left, top, width, height}, projectId, imageSRCs: images[selectedImage.index].src, gallery: images.map(imgEl => ({images: imgEl.src, projectId})), index: selectedImage.index }))
  }

  return (
    <Container className={isSmall || mediaSize < 4 ? "small" : undefined}>
      <CarouselItems theme={theme}>
        <Arrow data-to="prev" onClick={(e) => selectImage(e, arrowSelection)}>
          <RxCaretLeft />
        </Arrow>

        {loadPicture()}
        {
          Object.keys(previousSelectedImage).length ? <Picture src={previousSelectedImage.src} style={previousSelectedImage.styles} objectFit={selectedImage.type} /> : undefined
        }
        <Arrow className="next" data-to="next"  onClick={(e) => selectImage(e, arrowSelection)}>
          <RxCaretRight />
        </Arrow>
      </CarouselItems>
      {images.length > 1 && (
        <Gallery outlineColor={activeOutlineColors[color]} theme={theme}>
          {images.map((img, index) => (
            lazyLoad ? 
            <LazyLoad key={index} offset={300}>
              <img data-to={index} 
                onClick={e => selectImage(e, imageClickedSelection)}
                src={img.src[imageSize]} 
                alt="some alt" 
                className={img.src[imageSize] === selectedImage.src ? "active" : undefined} 
              />
            </LazyLoad> : <img data-to={index} 
                onClick={e => selectImage(e, imageClickedSelection)}
                src={img.src[imageSize]} 
                key={index} 
                alt="some alt" 
                className={img.src[imageSize] === selectedImage.src ? "active" : undefined} 
              />)
          )}
        </Gallery>
      )}
    </Container>
  )
}

export default Carousel


const Gallery = styled.div`
  overflow-y: auto;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;

  img {
    width: 3.5rem;
    height: 3.5rem;
    max-height: 8.5rem;
    border-radius: 8px;
    filter: brightness(0.5);
    transition: filter 0.3s ease;
    cursor: pointer;
    opacity: 0.8;

    &:hover, &.active {
      filter: brightness(1);
      opacity: 1;
    }

    &.active {
      outline: ${props => props.theme === "dark" ? 1 : 2}px solid;
      outline-offset: 2px;
      outline-color: ${props => props.outlineColor}; ;
    }
  }
`;

const Arrow = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 1px solid silver;
  width: 2.8rem;
  height: 2.8rem;
  z-index: 1;
  background: rgba(0, 0, 0, 0.35);
  transition: all 0.3s ease;
  font-size: 2rem;
  color: silver;

  & > * {
    pointer-events: none;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.65);
    color: white;
    transform: translateY(-50%) scale(1.05);
  }

  &.next {
    right: 1rem;
    left: auto;
  }
`;

const Picture = styled.img`
  object-fit: ${props => props.objectFit};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer; 


  @keyframes slideLeft {
    from {
      transform: translateX(0);
    } to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideRight {
    from {
      transform: translateX(0);
    } to {
      transform: translateX(100%)
    }
  }
`;

const CarouselItems = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 35rem;
  
  background: ${props => props.theme === "dark" ? "#5252526b" : "rgb(167 167 167 / 42%)"};
  border-radius: 1rem;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  top: 5rem;
  align-self: flex-start;


  .LazyLoad {
    opacity: 0;
    transition: opacity 1s ease-in-out;

    &.is-visible {
      opacity: 1;
    }
  }

  &.small {
    flex-direction: column;
    position: relative;
    top: 0;

    ${CarouselItems} {
      height: 25rem;
      border-radius: 0;
    }

    ${Gallery} {
      overflow-x: auto;
      flex-direction: row;
      flex: 1;

      img {
        width: 3rem;
        height: 3rem;
        max-width: 3rem;
      }
    }
  }
`;

