import React from "react";
import styled from "styled-components";
import ErrorIcon from "mdi-react/ErrorIcon";

type Props = {
  error?: Error | null;
};

export class ErrorView extends React.Component<Props> {
  componentDidMount() {
    const { error } = this.props;

    if (!error) {
      return;
    }

    console.error(error);
  }

  render() {
    return (
      <ErrorViewContainer>
        <ErrorIcon size={64} />
        <h2>An unknown error occurred!</h2>
        <p>Our engineers have been notified about it.</p>

        <h3>Recovery steps</h3>
        <div>
          <ul>
            <li>Refresh the page.</li>
            <li>Sign out and sign back in.</li>
            <li>Clear browser cache, and try again.</li>
          </ul>
        </div>
      </ErrorViewContainer>
    );
  }
}

const ErrorViewContainer = styled.div`
  padding: 16px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 4px;
  background: #fff;

  > * {
    margin-bottom: 20px;
  }
`;
