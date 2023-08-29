import { useContext, useState } from "react";
import styles from "./ConfirmAdmin.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
let ConfirmAdmin = () => {
  let navigate = useNavigate();
  let { setShowQueryData } = useContext(AuthContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(false);
  let submitHandler = (e) => {
    e.preventDefault();
    if (
      email.trim() === "pprotaxsolutions@gmail.com" &&
      password.trim() === "protax_solutions_trust_upon_us_1"
    ) {
      let currentTime = new Date().getTime();
      let expiryTime = currentTime + 8 * 60 * 60 * 1000;
      localStorage.setItem(
        "pprotaxSolution",
        JSON.stringify({ authenticated: true, expiry: expiryTime })
      );
      setShowQueryData(true);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.formDiv}>
          <div className={styles.topSectionsDiv}>
            <p className={styles.confirmationHeading}>Protax Solutions</p>
            <p
              className={styles.crossSymbol}
              onClick={() => navigate("/contact")}
            >
              ✖
            </p>
          </div>
          <div className={styles.inputSection}>
            <p className={styles.inputHeading}>Enter Email</p>
            <input
              className={styles.input}
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputSection}>
            <p className={styles.inputHeading}>Enter password</p>
            <input
              className={styles.input}
              type="password"
              placeholder="yourPassWord123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} onClick={submitHandler}>
            Submit
          </button>
          {error ? (
            <p className={styles.errorMessage}>
              Wrong credentials entered . Try again
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ConfirmAdmin;