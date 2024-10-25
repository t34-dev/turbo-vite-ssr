import "./style.css";
import s from "./index.module.scss";

import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link.js";
import { RootProvider } from "../components/providers/root-provider";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      <Header />
      <div
        style={{
          display: "flex",
          maxWidth: 900,
          margin: "auto",
        }}
      >
        <Sidebar>
          <Logo />
          <Link href="/">Welcome</Link>
          <Link href="/todo">Todo</Link>
          <Link href="/star-wars">Data Fetching</Link>
          <Link href="/login">Login</Link>
          <Link href="/query">Query</Link>
        </Sidebar>
        <Content>{children}</Content>
      </div>
    </RootProvider>
  );
}

const Header = () => {
  const { user } = useUser();
  return (
    <div className={s.header}>
      <div className={s.header__logo}>
        <Link href="/">LOGO</Link>
      </div>
      <div className={s.header__user}>
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <SignedIn>
            <div>
              <UserButton />
              {user?.firstName && <div>{user.firstName}</div>}
            </div>
          </SignedIn>
        )}
      </div>
    </div>
  );
};

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        lineHeight: "1.8em",
        borderRight: "2px solid #eee",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container" className={s.wrap}>
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
      <a href="/">
        <img src={"/logo.svg"} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
