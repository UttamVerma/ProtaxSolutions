import styles from "./Contact.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import call from "../Components/Assets/call.png";
import email from "../Components/Assets/email.png";
import map from "../Components/Assets/map.png";

let Contact = () => {
  return (
    <>
      <Navbar />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.354056119093!2d76.80097187569966!3d30.708445474596015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f95a4f1f17225%3A0xd4d5d7d5054ab347!2sProtax%20Solutions!5e0!3m2!1sen!2sin!4v1691652690053!5m2!1sen!2sin"
        className={styles.map}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className={styles.infoDiv}>
        <div className={styles.infoChildDiv}>
          <img className={styles.infoImages} src={call} alt="call-image" />
          <p className={styles.infoDesc}>Call us at :- +91-9878856649 for any support or query</p>
        </div>
        <div className={styles.infoChildDiv}>
          <img className={styles.infoImages} src={map} alt="address-image" />
          <p className={styles.infoDesc}>Our address :- Plot No 437, 2nd Floor, Industrial Area Phase 2, Chandigarh, 160002</p>
        </div>
        <div className={styles.infoChildDiv}>
          <img className={styles.infoImages} src={email} alt="email-image" />
          <p className={styles.infoDesc}>Email us at :- pprotaxsolutions@gmail.com to inform any issues or help</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
