import styles from "./AboutUs.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";

let AboutUs = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.backgrounDiv}>
        <div className={styles.headingDiv}>
          <p className={styles.aboutHeading}>About Us</p>
        </div>
        <div className={styles.headingDiv}>
          <p className={styles.headingPara}>
            An Enduring Legacy : Innovating Business Experience Since 2018
          </p>
          {/* <p className={styles.headingPara}>Trust Upon Us</p> */}
        </div>
      </div>
      <p className={styles.introHeading}>Protax Solutions</p>
      <p className={styles.introText}>
        Welcome to our esteemed firm of seasoned Tax Professionals, Chartered
        Accountants, Company Secretary and Advocates dedicated to providing an
        extensive array of top-tier accounting and taxation services all under a
        single roof. Our firm's inception was marked by the collaboration of a
        team of highly experienced professionals, strategically based in the
        beautiful city - Chandigarh.
      </p>
      <p className={styles.introText2}>
        Armed with our proficiency in untangling intricate problems and our
        proactive approach to client engagement, we have established ourselves
        as the ultimate destination – a one stop shop boasting a multitude of
        professional service offerings, all conveniently located under our roof.
      </p>
      <Footer />
    </>
  );
};
export default AboutUs;
