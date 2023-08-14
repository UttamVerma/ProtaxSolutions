import styles from "./Footer.module.css";
import logo from "../Components/Assets/logoprotaxfinal.png";
import facebook from "../Components/Assets/facebook.png";
import instagram from "../Components/Assets/instagram.png";
import twitter from "../Components/Assets/twitter.png";
import linkedin from "../Components/Assets/linkedin.png";

let Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.parentDiv}>
          <img className={styles.image} src={logo} alt="logo" />
          <p className={styles.followHeading}>Follow us on</p>
          <div className={styles.imageDiv}>
            <img className={styles.followImage} src={facebook} alt="facebook" />
            <img
              className={styles.followImage}
              src={instagram}
              alt="instagram"
            />
            <img className={styles.followImage} src={linkedin} alt="linkedin" />
            <img className={styles.followImage} src={twitter} alt="twitter" />
          </div>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Popular Services</p>
          <p className={styles.popularServices}>MSME Registration</p>
          <p className={styles.popularServices}>Audit</p>
          <p className={styles.popularServices}>Business Registration</p>
          <p className={styles.popularServices}>GST Complainces</p>
          <p className={styles.popularServices}>Financial Consulting</p>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Discover More</p>
          <p className={styles.popularServices}>Home</p>
          <p className={styles.popularServices}>About Us</p>
          <p className={styles.popularServices}>Contact</p>
          <p className={styles.popularServices}>Our Services</p>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Address & Contact</p>
          <p className={styles.popularServices2}>Mob :- +91-9878856649</p>
          <p className={styles.popularServices2}>
            Email Us at: pprotaxsolutions@ gmail.com
          </p>
          <p className={styles.popularServices2}>Address:</p>
          <p className={styles.popularServices2}>
            Plot No 437, 2nd Floor, Industrial Area Phase 2,
            Chandigarh, 160002
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
