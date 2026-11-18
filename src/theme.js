//We're importing the function "createTheme" from the MUI package.
import { createTheme } from "@mui/material/styles";

// Our design tokens from the design system.
/* This file collects all our colours, fonts and shapes in one place.
These are our "design tokens" from the design system in Figma. 
The whole app gets its colours from here, so if we change a colour here - it changes automatically everywhere its used in the app
*/
const theme = createTheme({
  palette: {
    primary: {
      main: "#5E35B1",
      dark: "#4527A0",
      light: "#6B5CC5",
    },
    secondary: {
      main: "#D84315",
      dark: "#BF360C",
      light: "#FF7043",
    },
    error: {
      main: "#C62828",
      dark: "#B71C1C",
      light: "#E57373",
    },
    text: {
      primary: "#1F1633",
      secondary: "#49454F",
    },
    background: {
      default: "#F3EFFB",
      paper: "#FFFFFF",
    },
  },
  typography: {
    //Font - all text should in our app be Roboto font. sans-serif is a backup font - If roboto can't be loaded for some reason, the browser uses a similiar font instead.
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    //How rounded the corners should be on cards, buttons etc. The bigger the number, the rounder the corner.
    borderRadius: 16,
  },
});

//Important line to make sure that other files are allowed to get and use the theme by importing it.
export default theme;
