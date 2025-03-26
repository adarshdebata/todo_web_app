import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset some default browser styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Global font settings */
  body {
    font-family: 'Roboto';
    background: #f5f5f5;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins';
  }
`;

export default GlobalStyles;
