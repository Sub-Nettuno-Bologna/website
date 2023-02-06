import { createGlobalStyle, css } from 'styled-components';

export const fontFamily = css`
  font-family: 'Montserrat', sans-serif;
`;

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  ${fontFamily}
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  color: ${(p) => p.theme.black};
}
h1,
h2,
h3 {
  margin: 0;
  font-weight: 700;
}

h2 {
  margin-bottom: 0.5em;
}

a {
  text-decoration: none;
 

  &, &:hover {
    color: ${(p) => p.theme.blue};
  }

}

button {
  ${fontFamily}
}

`;

export default GlobalStyle;
