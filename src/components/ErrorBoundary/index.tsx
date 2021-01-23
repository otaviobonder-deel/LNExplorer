import React, { Component, ReactNode } from "react";
import { Typography } from "@material-ui/core";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Typography variant="h4">Sorry, something went wrong</Typography>
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
