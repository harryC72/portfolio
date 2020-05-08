import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

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
    primary: blue,
  },
  status: {
    danger: "orange",
  },
});

export const theme = createMuiTheme({
  spacing: 8,
});
