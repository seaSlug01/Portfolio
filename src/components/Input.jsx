import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import throttle from "lodash.throttle";
import styled from "styled-components";
import { InputGroup, Label, FieldIcon as Icon, Error } from '../styles/reusableStyles';
import { setLetters } from "../utils/flyingLetters";

function Input({name, label, icon, placeholder, error, touched, onBlur, theme, ...restProps}) {
  const dispatch = useDispatch();
  const inputId = crypto.randomUUID();
  const [isFocused, setIsFocused] = useState(false);

  console.log("THEME IN input field", theme)

  return (
    <Container>
      <Label htmlFor={inputId} theme={theme}>{label}</Label>
      <InputGroup className={`${isFocused ? "focus" : undefined} ${(error && isFocused) ? "error" : undefined}`} theme={theme}>
        <Icon theme={theme}>
          {icon}
        </Icon>
        <InputField
          theme={theme}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            onBlur(e)
            setIsFocused(false)
          }}
          id={inputId}
          name={name}
          placeholder={placeholder}
          onKeyUp={throttle((e) => {
            console.log("dafuq?")
            setLetters(e, dispatch)
          }, 100)}
          autoComplete="off"
          {...restProps}
        />
      </InputGroup>
      {error && touched && <Error theme={theme}>{error}</Error> }
    </Container>
  )
}

export default Input

const InputField = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ;
  width: 100%;
  color: ${props => props.theme === "dark" ? "#dbdbdb" : "#565656"};

  &::placeholder {
    color: ${props => props.theme === "dark" ? "rgb(163 163 163)" : "#565656"};
  }
`;



const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

