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

.responsive-padding {
  padding-inline: 10rem;

  @media (max-width: 1550px) {
    padding-inline: 8vw;
  }

  @media (max-width: 800px) {
    padding-inline: 1rem;
  }
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}


.gradient {
  position: relative;
  

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &.blue {
    &::after {
      background: linear-gradient(to top, rgb(0, 132, 255, ${props => props.theme === "dark" ? "0.6" : "0.8"}), transparent);
    }
  }

  &.violet {
    &::after {
      background: linear-gradient(to top, rgba(255, 44, 255, ${props => props.theme === "dark" ? 0.37 : 0.57}), transparent);
    }
  }

  &.orange {
    &::after {
      background: linear-gradient(to top, rgba(255, 72, 0, ${props => props.theme === "dark" ? 0.298 : 0.55}), transparent);
    }
  }

  &.green {
    &::after {

    }
  }
}

`;

export default GlobalStyle;
