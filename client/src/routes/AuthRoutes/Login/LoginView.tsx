import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

interface Props {
  busy: boolean;
  submit: (email: string, password: string) => void;
}

export const LoginView: React.FC<Props> = ({ busy, submit }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    submit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Email</label>
        <input ref={emailRef} type="email" id="email" disabled={busy} />
      </FormGroup>

      <FormGroup>
        <label>Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          disabled={busy}
        />
      </FormGroup>

      <Button type="submit" disabled={busy}>
        Log in
      </Button>
    </Form>
  );
};

const FormGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  input[type="email"] {
    padding: 10px;
  }

  input[type="password"] {
    padding: 10px;
  }
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding: 10px;
  border: 1px solid ${colors.secondaryForground};
  background: ${colors.secondaryBackground};
`;

const Button = styled.button`
  padding: 10px;
`;
