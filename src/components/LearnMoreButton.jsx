import React from 'react'
import styled from "styled-components";
import { RxChevronRight } from "react-icons/rx";

function LearnMoreButton({text, icon, iconPosition, ...restProps}) {
  return (
    <Button iconposition={iconPosition || "right"} {...restProps}>
      <span>{text}</span>
      <Icon>
        {icon || <RxChevronRight />}
      </Icon>
    </Button>
  )
}

export default LearnMoreButton

const Icon = styled.span`
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  position: relative;
  top: 2px;
  width: 0;
  overflow: hidden;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #e9e9e9;
  letter-spacing: 0.3px;
  display: inline-flex;
  align-items: center;
  flex-direction: ${props => props.iconposition === "left" ? "row-reverse" : "row"};
  transition: transform 0.2s ease;

  &:active {
    transform: translateY(-3px);
  }

  &:hover {
    ${Icon} {
      width: 1.2rem;
      opacity: 1;
      visibility: visible;
    }
  }
`;