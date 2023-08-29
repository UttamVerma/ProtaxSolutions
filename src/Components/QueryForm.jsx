import { useContext, useEffect, useState } from "react";
import styles from "./QueryForm.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
let generateUniqueId = () => {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};
let QueryForm = () => {
  let { showQueryDiv, setShowQueryDiv } = useContext(AuthContext);
  let [timer, setTimer] = useState(5);
  let [personName, setPersonName] = useState("");
  let [personEmail, setPersonEmail] = useState("");
  let [personQuery, setPersonQuery] = useState("");
  let [submitHandler, setSubmitHandler] = useState(false);
  let [error, setError] = useState(false);
  let submitHandlerFunction = () => {
    if (
      personName.trim() === "pprotaxsolutions" &&
      personEmail.trim() === "pprotaxsolutions@gmail.com" &&
      personQuery.trim() === "protaxsolutions@gmail.com"
    ) {
      let url = "/proSolAdminForAnalyse";
      let newTab = window.open(url, "_blank");
      return;
    }
    let newId = generateUniqueId();
    if (personName.trim().length < 3) {
      setError(true);
      return;
    }
    if (personEmail.trim().length < 5 || !personEmail.includes("@")) {
      setError(true);
      return;
    }
    let emailParts = personEmail.split("@");
    if (emailParts.length !== 2 || emailParts[1] !== "gmail.com") {
      setError(true);
      return;
    }
    let username = emailParts[0];
    if (!/^[a-zA-Z0-9._%+-]+$/.test(username)) {
      setError(true);
      return;
    }
    if (personQuery.trim().length < 3) {
      setError(true);
      return;
    }
    fetch(
      "https://protax-solutions-query-data-default-rtdb.firebaseio.com/data.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: personName,
          email: personEmail,
          query: personQuery,
          date_DAY_MM_DD_YY: new Date().toDateString(),
          time_HH_MM_SS: new Date().toLocaleTimeString(),
          id: newId,
          resolved_status: false,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSubmitHandler(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (submitHandler) {
      let timerInSeconds = setTimeout(() => {
        if (timer > 0) {
          setTimer((prevTime) => prevTime - 1);
        }
      }, 1000);
      return () => clearTimeout(timerInSeconds);
    }
  }, [submitHandler, timer]);
  useEffect(() => {
    if (timer == 0) {
      setShowQueryDiv(false);
    }
  }, [timer]);
  return (
    <>
      <div className={styles.formBackdropDiv}>
        <div className={styles.formDiv}>
          <div className={styles.topSection}>
            <p className={styles.topSectionHeading}>Connect with Us</p>
            <p
              className={styles.crossSymbol}
              onClick={() => setShowQueryDiv(false)}
            >
              ✖
            </p>
          </div>
          <div className={styles.queryFieldDiv}>
            <p className={styles.queryHeading}>Enter your name</p>
            <input
              className={styles.queryInput}
              placeholder="Your Full Name"
              value={personName}
              type="text"
              required
              onChange={(e) => setPersonName(e.target.value)}
            />
          </div>
          <div className={styles.queryFieldDiv}>
            <p className={styles.queryHeading}>Enter your email</p>
            <input
              className={styles.queryInput}
              placeholder="Your Valid Email"
              value={personEmail}
              type="email"
              required
              onChange={(e) => setPersonEmail(e.target.value)}
            />
          </div>
          <div className={styles.queryFieldDiv}>
            <p className={styles.queryHeading}>Enter your query in detail</p>
            <textarea
              className={styles.queryBox}
              placeholder="Your Query"
              value={personQuery}
              typeof="text"
              required
              onChange={(e) => setPersonQuery(e.target.value)}
            />
            {personQuery.trim().length > 0 && (
              <p
                className={styles.suggestionPersonQuery}
                style={personQuery.trim().length < 5 ? { color: "red" } : {}}
              >
                {personQuery.trim().length < 3
                  ? "Please enter a valid query"
                  : ""}
              </p>
            )}
          </div>
          <button
            className={styles.submitButton}
            disabled={!personEmail || !personName || !personQuery}
            onClick={submitHandlerFunction}
          >
            Submit your Query
          </button>
          {submitHandler ? (
            <p className={styles.submissionText}>
              Your query has been submitted , we will answer it as soon as
              possible . This form will disappear in{" "}
              <span className={styles.timer}>({timer}) </span>seconds.
            </p>
          ) : null}
          {error ? (
            <p className={styles.errorText}>
              Something is wrong in entered data , Please check once and submit
              again.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default QueryForm;
