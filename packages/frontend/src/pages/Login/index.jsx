import { useMutation } from "@apollo/client";
import { useEffect, useState, useTransition } from "react";
import { MUTATION_LOGIN } from "../../mutations/login";
import styles from "./login.module.scss";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, startTransition] = useTransition();
  const [login] = useMutation(MUTATION_LOGIN);

  // Retornando usuário para /greeting caso já esteja logado.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) window.location.href = "/greeting";
    }
  }, []);

  // Handler do login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(null);
    startTransition(async () => {
      try {
        // Fazendo login
        const res = await login({ variables: { email, password } });
        if (res.data.mutationLogin) {
          // Salvando usuário no localStorage
          const { user, message } = res.data.mutationLogin;
          localStorage.setItem("user", JSON.stringify(user));
          setMessage(message);
          setSuccess(true);
          // Redirecionando para /greeting
          setTimeout(() => {
            window.location.href = "/greeting";
          }, 3000);
        }
      } catch (err) {
        setMessage(err.message);
        setSuccess(false);
      }
    });
  };

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        <h1 className={styles.Title}>Login</h1>
        <p className={styles.Description}>Log in to your account</p>
        {message && (
          <p className={styles.Message} data-success={success}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.Field}>
            <label className={styles.Label}>Email</label>
            <input
              className={styles.Input}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>
          <div className={styles.Field}>
            <label className={styles.Label}>Password</label>
            <input
              className={styles.Input}
              type="password"
              placeholder="yourp@$$w0rd"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>
          <button className={styles.Button} aria-current={loading}>
            {loading ? (
              <>
                Loading{" "}
                <div className={styles.Dots}>
                  <div className={styles.Dot} />
                  <div className={styles.Dot} />
                  <div className={styles.Dot} />
                </div>
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
