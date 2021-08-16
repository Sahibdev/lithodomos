import React, { useRef } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
import isEmail from "../../../utils/validators/isEmail";

interface Props {
  busy: boolean;
  submit: (name: string, email: string, password: string) => void;
}

export const SignupView: React.FC<Props> = ({ busy, submit }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    console.log("handleSubmit");

    if (busy) {
      return;
    }

    e.preventDefault();

    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!name.trim()) {
      console.log("set name");
      return;
    }

    if (!isEmail(email.trim())) {
      console.log("set email");
      return;
    }

    if (!password || password !== confirmPassword) {
      console.log("set password");
      return;
    }

    submit(name, email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" disabled={busy} />
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">Email</label>
        <input ref={emailRef} type="email" id="email" disabled={busy} />
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          disabled={busy}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          ref={confirmPasswordRef}
          type="password"
          id="confirm-password"
          disabled={busy}
        />
      </FormGroup>

      <Button type="submit" disabled={busy}>
        Sign up
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

  input[type="text"] {
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
