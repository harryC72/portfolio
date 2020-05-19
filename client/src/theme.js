import { createMuiTheme } from "@material-ui/core/styles";
import { purple, green, red, pink, blue, grey } from "@material-ui/core/colors";

const lightGrey = grey[400];
const mediumBlue = blue[600];

export const theme1 = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: "orange",
  },
});

export const theme2 = createMuiTheme({
  palette: {
    primary: red,
    secondary: pink,
  },
  status: {
    danger: "orange",
  },
});

export const theme3 = createMuiTheme({
  palette: {
    primary: { main: lightGrey },
    secondary: { main: mediumBlue },
  },
  status: {
    danger: "orange",
  },
});

export const theme = createMuiTheme({
  spacing: 8,
});
