import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

const CustomSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log("Вход выполнен успешно");
      } else {
        console.log("Требуется дополнительное действие", result);
      }
    } catch (err) {
      console.error("Ошибка входа", err);
      setError("Неверный email или пароль");
    }
  };

  const handleOAuthSignIn = async (strategy: "oauth_google" | "oauth_github") => {
    try {
      const result = await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
      console.log("Результат OAuth входа", result);
    } catch (err) {
      console.error("Ошибка OAuth входа", err);
      setError("Ошибка при входе через социальную сеть");
    }
  };

  const handleMetaMaskSignIn = async () => {
    try {
      const result = await signIn.authenticateWithMetamask({
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
      console.log("Результат MetaMask входа", result);
    } catch (err) {
      console.error("Ошибка MetaMask входа", err);
      setError("Ошибка при входе через MetaMask");
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailSignIn}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>

      <button onClick={() => handleOAuthSignIn("oauth_google")}>Войти через Google</button>
      <button onClick={() => handleOAuthSignIn("oauth_github")}>Войти через GitHub</button>
      <button onClick={handleMetaMaskSignIn}>Войти через MetaMask</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default CustomSignIn;
