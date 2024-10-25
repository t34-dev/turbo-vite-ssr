import { useSignIn, useSignUp } from "@clerk/clerk-react";
import React, { useState } from "react";
import s from "./AuthForm.module.scss";

// Определяем типы для OAuth провайдеров
type OAuthStrategy = "oauth_google" | "oauth_github";

// Определяем тип для window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      chainId?: string;
    };
  }
}

// Определяем типы для ошибок Clerk
interface ClerkError {
  errors: Array<{ message: string }>;
}

export const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  if (!signInLoaded || !signUpLoaded || !signIn || !signUp) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === "complete") {
          await signIn.setActive({ session: result.createdSessionId });
        } else {
          console.error("Ошибка входа:", result);
          setError("Ошибка при входе");
        }
      } else {
        const result = await signUp.create({
          emailAddress: email,
          password,
        });

        await result.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setError("Проверьте email для подтверждения");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (isClerkError(err)) {
        setError(err.errors?.[0]?.message || "Произошла ошибка");
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWith = async (strategy: OAuthStrategy) => {
    try {
      setLoading(true);
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: window.location.origin,
      });
    } catch (err) {
      console.error(`Ошибка входа через ${strategy}:`, err);
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithMetamask = async () => {
    try {
      setLoading(true);
      if (typeof window.ethereum === "undefined") {
        throw new Error("MetaMask не установлен");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || !accounts[0]) {
        throw new Error("Не удалось получить адрес кошелька");
      }

      const chainId = window.ethereum.chainId;
      if (!chainId) {
        throw new Error("Не удалось получить chainId");
      }

      const result = await signIn.authenticateWithWeb3({
        identifier: accounts[0].toLowerCase(),
      });

      if (result.status === "complete") {
        await signIn.setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      console.error("Ошибка входа через MetaMask:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ошибка входа через MetaMask");
      }
    } finally {
      setLoading(false);
    }
  };

  // Функция для проверки типа ошибки Clerk
  function isClerkError(error: unknown): error is ClerkError {
    return (
      typeof error === "object" && error !== null && "errors" in error && Array.isArray((error as ClerkError).errors)
    );
  }

  return (
    <div className={s.wrap}>
      <h2>{isSignIn ? "Вход" : "Регистрация"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button type="submit" disabled={loading}>
          {isSignIn ? "Войти" : "Зарегистрироваться"}
        </button>

        {error && (
          <div role="alert" className={s.error}>
            {error}
          </div>
        )}
      </form>

      <div className={s.list}>
        <button type="button" onClick={() => signInWith("oauth_google")} disabled={loading}>
          Войти через Google
        </button>

        <button type="button" onClick={() => signInWith("oauth_github")} disabled={loading}>
          Войти через GitHub
        </button>

        <button type="button" onClick={signInWithMetamask} disabled={loading}>
          Войти через MetaMask
        </button>
      </div>

      <button type="button" onClick={() => setIsSignIn(!isSignIn)} disabled={loading}>
        {isSignIn ? "Нет аккаунта? Зарегистрироваться" : "Есть аккаунт? Войти"}
      </button>
    </div>
  );
};
