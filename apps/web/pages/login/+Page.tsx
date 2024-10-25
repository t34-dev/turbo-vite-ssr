import React from "react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "ui";

export default function Page() {
  return (
    <>
      <h1>Login</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Войти</Button>
        </SignInButton>
      </SignedOut>
      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </>
  );
}
