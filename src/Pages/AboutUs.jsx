import styles from "./AboutUs.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";

let AboutUs = () => {
  useEffect(()=>{
    window.scroll({ top: 0, behavior: "smooth" });
  },[]);
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
          <p className={styles.headingPara}>Trust Upon Us</p>
        </div>
      </div>
      <p className={styles.introHeading}>ProTax Solutions</p>
      <p className={styles.introText}>
        Protax Solutions is a professional accounting services firm providing
        accounting, bookkeeping and taxation services.
      </p>
      <p className={styles.introText2}>
        Our company performs functions such accounting, Bookkeeping, payroll,
        financial analysis, bank reconciliations and financial statement
        preparation, Income Tax Compliances, GST Compliances and other taxation
        services.
      </p>
      <Footer/>
    </>
  );
};
export default AboutUs;
