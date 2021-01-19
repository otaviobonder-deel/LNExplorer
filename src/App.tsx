import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { GraphPage } from "./pages/graph";
import theme from "./styles/customMuiTheme";

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GraphPage />
  </ThemeProvider>
);

export default App;
