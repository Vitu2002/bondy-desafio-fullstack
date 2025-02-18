import { useCallback, useEffect, useState } from "react";
import styles from "./greeting.module.scss";

export function GreetingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) setUser(JSON.parse(user));
      else window.location.href = "/login";
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }, []);

  return (
    <div className={styles.Page}>
      <div className={styles.Container}>
        {!user ? (
          <div className={styles.Loading}>
            Loading data
            <div className={styles.Dots}>
              <div className={styles.Dot} />
              <div className={styles.Dot} />
              <div className={styles.Dot} />
            </div>
          </div>
        ) : (
          <>
            <h1 className={styles.Title}>
              Welcome <span className={styles.User}>{user.name}</span>!
            </h1>
            <p className={styles.Description}>
              Your email is <span className={styles.Email}>{user.email}</span>
            </p>
            <p className={styles.Description}>
              Your company is{" "}
              <span className={styles.Company}>{user.company}</span>
            </p>
            <button className={styles.Button} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
