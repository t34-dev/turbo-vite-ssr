import React from "react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "ui";
import CustomSignIn from "../../components/AuthForm2/AuthForm2";
import { AuthForm } from "../../components/AuthForm/AuthForm";

export default function Page() {
  return (
    <>
      <h1>Login</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Войти</Button>
        </SignInButton>
      </SignedOut>

      <hr />
      <CustomSignIn />
      <AuthForm />
      <hr />

      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </>
  );
}
