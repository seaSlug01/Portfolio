import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import throttle from "lodash.throttle";
import styled from "styled-components";
import { InputGroup, Label, FieldIcon as Icon, Error } from '../styles/reusableStyles';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { setLetters } from "../utils/flyingLetters";

function Textarea({name, label, error, touched, onBlur, onChange, theme, ...restProps}) {
  const dispatch = useDispatch();
  const textareaId = crypto.randomUUID();
  const [isFocused, setIsFocused] = useState(false);

  function adjustHeight(e) {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  return (
    <Container>
      <Label htmlFor={textareaId} theme={theme}>{label}</Label>
      <InputGroup className={`${isFocused ? "focus" : undefined} ${(error && isFocused) ? "error" : undefined}`} theme={theme}>
        <Icon theme={theme}>
          <HiOutlinePencilAlt />
        </Icon>
        <TextareaField id={textareaId} name={name} placeholder="Your message" rows={1} onFocus={() => setIsFocused(true)} theme={theme}
          onBlur={(e) => {
            onBlur(e)
            setIsFocused(false)
          }}
          onChange={e => {
            onChange(e)
            adjustHeight(e)
          }}
          onKeyUp={throttle((e) => {
            console.log("Am i getting set n shit?")
            setLetters(e, dispatch)
          }, 100)}
          {...restProps}
        />
      </InputGroup>
      {error && touched && <Error theme={theme}>{error}</Error> }
    </Container>
  )
}

export default Textarea

const TextareaField = styled.textarea`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${props => props.theme === "dark" ? "#dbdbdb" : "#565656"};
  width: 100%;
  overflow:hidden;
  resize: none;

  &::placeholder {
    color: ${props => props.theme === "dark" ? "rgb(163 163 163)" : "#565656"};
  }
`

const Container = styled.div`

`;