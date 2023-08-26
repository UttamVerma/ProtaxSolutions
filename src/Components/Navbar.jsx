import styles from "./Navbar.module.css";
import logo from "../Components/Assets/protax-solutions-logo-cropped.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
let Navbar = () => {
  let [showHamburgerDiv, setShowHamburgerDiv] = useState(false);
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
  let navigateHomeHandler = () => {
    setShowHamburgerDiv(false);
    navigate("/");
  };
  let navigateAboutHandler = () => {
    setShowHamburgerDiv(false);
    navigate("/about");
  };
  let navigateContactHandler = () => {
    setShowHamburgerDiv(false);
    navigate("/contact");
  };
  let navigateServicesHandler = () => {
    setShowHamburgerDiv(false);
    navigate("/services");
  };
  useEffect(() => {
    if (showHamburgerDiv) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showHamburgerDiv]);
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
            style={scrolled ? { fontWeight: 400 } : { fontWeight: 400 }}
            onClick={() => {
              navigate("/about");
            }}
          >
            About Us
          </p>
          <p
            className={styles.options}
            style={scrolled ? { fontWeight: 400 } : { fontWeight: 400 }}
            onClick={() => {
              navigate("/services");
            }}
          >
            What we do
          </p>
          <p
            className={styles.options}
            style={scrolled ? { fontWeight: 400 } : { fontWeight: 400 }}
            onClick={() => {
              navigate("/contact");
            }}
          >
            Contact
          </p>
          <p
            className={styles.hambergerMenu}
            onClick={() => setShowHamburgerDiv(true)}
          >
            ☰
          </p>
        </div>
      </div>
      {showHamburgerDiv ? (
        <div className={styles.hameburgerMenuDiv}>
          <div className={styles.rightToLeftSliderDiv}>
            <div className={styles.topSection}>
              <p className={styles.topSectionHeading}>Quick Links</p>
              <p
                className={styles.closeSymbol}
                onClick={() => setShowHamburgerDiv(false)}
              >
                ✖
              </p>
            </div>
            <div
              className={styles.quickLinksDiv}
              onClick={() => navigateHomeHandler()}
            >
              <p className={styles.quickLinkHeading}>Home</p>
              <p className={styles.moveSymbol}>→</p>
            </div>
            <div
              className={styles.quickLinksDiv}
              onClick={() => navigateAboutHandler()}
            >
              <p className={styles.quickLinkHeading}>About Us</p>
              <p className={styles.moveSymbol}>→</p>
            </div>
            <div
              className={styles.quickLinksDiv}
              onClick={() => navigateServicesHandler()}
            >
              <p className={styles.quickLinkHeading}>What we do</p>
              <p className={styles.moveSymbol}>→</p>
            </div>
            <div
              className={styles.quickLinksDiv}
              onClick={() => navigateContactHandler()}
            >
              <p className={styles.quickLinkHeading}>Contact</p>
              <p className={styles.moveSymbol}>→</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Navbar;
