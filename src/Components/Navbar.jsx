import styles from "./Navbar.module.css";
import logo from "../Components/Assets/logoprotaxfinal.png";
import { useState , useEffect} from "react";
let Navbar = () => {
  let [scrolled, setScrolled] = useState(false);
  let handleScroll = () => {
    if (window.scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className={!scrolled ? styles.main : styles.afterScroll}>
        <img className={styles.logoImage} src={logo} alt="logo"/>
        <div className={styles.optionsDiv}>
            <p className={styles.options}>About Us</p>
            <p className={styles.options}>Contact</p>
            <p className={styles.options}>Services</p>
            <p className={styles.hambergerMenu}>☰</p>
        </div>
      </div>
    </>
  );
};
export default Navbar;
