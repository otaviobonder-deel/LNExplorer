import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { GraphPage } from "./pages/graph";
import theme from "./styles/customMuiTheme";
import ErrorBoundary from "./components/ErrorBoundary";

const useStyles = makeStyles({
  body: {
    display: "flex",
    minHeight: "100vh",
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.body}>
        <ErrorBoundary>
          <GraphPage />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
};

export default App;
