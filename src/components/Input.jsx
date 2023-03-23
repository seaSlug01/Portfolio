import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import throttle from "lodash.throttle";
import styled from "styled-components";
import { InputGroup, Label, FieldIcon as Icon, Error } from '../styles/reusableStyles';
import { setLetters } from "../utils/flyingLetters";

function Input({name, label, icon, placeholder, error, touched, onBlur, ...restProps}) {
  const dispatch = useDispatch();
  const inputId = crypto.randomUUID();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <InputGroup className={`${isFocused ? "focus" : undefined} ${(error && isFocused) ? "error" : undefined}`}>
        <Icon>
          {icon}
        </Icon>
        <InputField
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
      {error && touched && <Error>{error}</Error> }
    </Container>
  )
}

export default Input

const InputField = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #dbdbdb;
  width: 100%;

  &::placeholder {
    color: rgb(163 163 163);
  }
`;



const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

