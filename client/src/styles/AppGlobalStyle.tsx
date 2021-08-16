import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const AppGlobalStyle = createGlobalStyle`
html {
  color: ${colors.primaryBackground};
}

html, body {
  width: 100%;
  height: 100%;
  background: ${colors.primaryBackground};
  -webkit-overflow-scrolling: touch;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#root {
  height: 100%;
}

.navlink-selected {
  color: ${colors.secondaryForground};
}

a {
  color: ${colors.primaryText}; 
  text-decoration: none;
}

a:hover {
  color: ${colors.primaryText}; 
  cursor: pointer;
  text-decoration: underline;
}

a.active {
  color: ${colors.primaryText}; 
}
`;
