import { useEffect } from "react";

export function HomePage() {
  // Ao entrar na home (/), chega se tem login
  // Se sim, redireciona para /greeting
  // Se nao, redireciona para /login
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) window.location.href = "/greeting";
      else window.location.href = "/login";
    }
  });

  return null;
}
