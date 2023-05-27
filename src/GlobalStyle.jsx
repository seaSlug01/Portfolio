import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background: ${props => props.theme === "dark" ? "rgb(50, 50, 50)" : "#f9f9f9"};
  /* background:  #242424; */
  color: white;
}

a {
  text-decoration: none;
}

button {
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  font-family: "Roboto", sans-serif;
}

input {
  outline: none;
  font-family: "Roboto", sans-serif;
  border:none;
  background: transparent;
}

textarea {
  outline: none;
  resize: none;
  font-family: "Roboto", sans-serif;
  border:none;
  background: transparent;
}

.contain {
  overflow: hidden;
}

img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.d-none {
  display: none !important;
}

.bold {
  font-weight: bold !important;
}

.mb-5 {
  margin-bottom: 5rem !important;
}

.m-block {
  &--1 {
    margin-block: 1rem;
  }

  &--2 {
    margin-block: 2rem;
  }

  &--3 {
    margin-block: 3rem;
  }

  &--4 {
    margin-block: 4rem;
  }

  &--5 {
    margin-block: 5rem;
  }
}

`;

export default GlobalStyle;
