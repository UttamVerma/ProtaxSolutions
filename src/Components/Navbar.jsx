import styles from "./Navbar.module.css";
import logo from "../Components/Assets/logoprotaxfinal.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
let Navbar = () => {
  let navigate = useNavigate();
  let [scrolled, setScrolled] = useState(false);
  let handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={!scrolled ? styles.main : styles.afterScroll}>
        <img
          className={styles.logoImage}
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className={styles.optionsDiv}>
          <p
            className={styles.options}
            onClick={() => {
              navigate("/about");
            }}
          >
            About Us
          </p>
          <p
            className={styles.options}
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contact
          </p>
          <p
            className={styles.options}
            onClick={() => {
              navigate("/services");
            }}
          >
            Services
          </p>
          <p className={styles.hambergerMenu}>☰</p>
        </div>
      </div>
    </>
  );
};
export default Navbar;
