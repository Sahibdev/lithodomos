import React from "react";
import styled from "styled-components";
import { ErrorView } from "../components/ErrorView";

interface Props {
  children: any;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    const isChunkLoadError = error?.name === "ChunkLoadError";

    if (isChunkLoadError) {
      window.location.reload();
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <ErrorContainer>
          <ErrorView />
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Roboto-Condensed, Roboto, sans-serif;
`;
