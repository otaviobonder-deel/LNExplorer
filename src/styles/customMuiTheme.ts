import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const responsiveTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#3e2e56",
      main: "#17062d",
      dark: "#000004",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#cccccc",
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
    },
  },
});

const theme = responsiveFontSizes(responsiveTheme, { factor: 1 });

export default theme;
