import styles from "./Footer.module.css";
import logo from "../Components/Assets/protax-solutions-logo-cropped.jpg";
import facebook from "../Components/Assets/facebook.png";
import instagram from "../Components/Assets/instagram.png";
import whatsapp from "../Components/Assets/whatsapp.png";
import linkedin from "../Components/Assets/linkedin.png";
import { useNavigate } from "react-router-dom";

let Footer = () => {
  let navigate = useNavigate();
  let homePageHandler = () => {
    navigate("/");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let msmeHandler = () => {
    navigate("/service/MSME Registration");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let businessHandler = () => {
    navigate("/service/Business Registration");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let auditHandler = () => {
    navigate("/service/Audit");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let financialHandler = () => {
    navigate("/service/Financial Consulting");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let gstHandler = () => {
    navigate("/service/GST Compliances");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  let incomeTaxHandler = () => {
    navigate("/service/Income Tax Compliances");
    window.scroll({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.parentDiv}>
          <img
            className={styles.image}
            src={logo}
            alt="logo"
            onClick={() => homePageHandler()}
          />
          <p className={styles.followHeading}>Follow us on</p>
          <div className={styles.imageDiv}>
            <a
              href="https://www.facebook.com/accountingserviceconsultancy/"
              target="_blank"
            >
              <img
                className={styles.followImage}
                src={facebook}
                alt="facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/protaxsolutionsaccounting/"
              target="_blank"
            >
              {" "}
              <img
                className={styles.followImage}
                src={instagram}
                alt="instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/protax-solutions/"
              target="_blank"
            >
              <img
                className={styles.followImage}
                src={linkedin}
                alt="linkedin"
              />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=9878856649&text=Hello&type=phone_number&app_absent=0"
              target="_blank"
            >
              <img
                className={styles.followImage}
                src={whatsapp}
                alt="whatsapp"
              />
            </a>
          </div>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Popular Services</p>
          <p className={styles.popularServices} onClick={() => msmeHandler()}>
            MSME Registration
          </p>
          <p className={styles.popularServices} onClick={() => auditHandler()}>
            Audit
          </p>
          <p
            className={styles.popularServices}
            onClick={() => businessHandler()}
          >
            Business Registration
          </p>
          <p className={styles.popularServices} onClick={() => gstHandler()}>
            GST Compliances
          </p>
          <p
            className={styles.popularServices}
            onClick={() => financialHandler()}
          >
            Financial Consulting
          </p>
          <p
            className={styles.popularServices}
            onClick={() => incomeTaxHandler()}
          >
            Income Tax
          </p>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Discover More</p>
          <p
            className={styles.popularServices}
            onClick={() => homePageHandler()}
          >
            Home
          </p>
          <p
            className={styles.popularServices}
            onClick={() => navigate("/about")}
          >
            About Us
          </p>
          <p
            className={styles.popularServices}
            onClick={() => navigate("/services")}
          >
            What we do
          </p>
          <p
            className={styles.popularServices}
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
        </div>
        <div className={styles.parentDiv}>
          <p className={styles.followDivHeading}>Address & Contact</p>
          <p className={styles.popularServices2}>Mob :- +91-9878856649</p>
          <p className={styles.popularServices2}>
            Email Us at: pprotaxsolutions@ gmail.com
          </p>
          <p className={styles.popularServices2}>Address:</p>
          <p className={styles.popularServices2}>
            Plot No 437, 2nd Floor, Industrial Area Phase 2, Chandigarh, 160002
          </p>
          <a className={styles.popularServices} href="https://forms.gle/kLYFX5P6c24pf9Fe7" target="_blank">Give us a Feedback</a>
        </div>
      </div>
      <div className={styles.developerInfoDiv}>
        <p className={styles.developerInfoText}>
          Designed by{" "}
          <span className={styles.nameText}>
            <a
              href="https://api.whatsapp.com/send/?phone=9896125909&text=Hello&type=phone_number&app_absent=0"
              target="_blank"
            >
              Uttam Verma
            </a>{" "}
            &{" "}
            <span className={styles.nameText}>
              <a href="mailto:sakshamverma798@gmail.com" target="_blank">
                Saksham Verma
              </a>
            </span>
          </span>
        </p>
      </div>
    </>
  );
};

export default Footer;
