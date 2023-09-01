import Navbar from "../Components/Navbar";
import styles from "./HomePage.module.css";
import backgroundImage from "../Components/Assets/homepageImage.png";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import safe from "../Components/Assets/shield.png";
import qualified from "../Components/Assets/badge.png";
import { useNavigate } from "react-router-dom";
import backgroundImageForSmallScreen from "../Components/Assets/homepageImageForSmallScreenSizes.png";
let truncateWords = (text, maxWords) => {
  let words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " " + "...";
  }
  return text;
};
let HomePage = () => {
  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  let [servicesData, setServicesData] = useState([]);
  let [whyChooseData, setWhyChooseData] = useState([]);
  let [goalsData, setGoalsData] = useState([]);
  let firebaseConfig = {
    apiKey: "AIzaSyAz7dcJH7z1e1oxqkTQMr2g1-eNtPD0VQg",
    authDomain: "protax-solutions-all-web-data.firebaseapp.com",
    databaseURL:
      "https://protax-solutions-all-web-data-default-rtdb.firebaseio.com",
    projectId: "protax-solutions-all-web-data",
    storageBucket: "protax-solutions-all-web-data.appspot.com",
    messagingSenderId: "452865166423",
    appId: "1:452865166423:web:6a638fd3142d98f7df6712",
    measurementId: "G-GVSVBBWBR8",
  };
  initializeApp(firebaseConfig);
  getAnalytics();
  useEffect(() => {
    let servicesRef = ref(getDatabase(), "goals");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data;
        setGoalsData(servicesArray[0].allGoals);
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, []);
  useEffect(() => {
    let servicesRef = ref(getDatabase(), "whyChooseUs");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data;
        setWhyChooseData(servicesArray[0].allReasons);
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, []);
  useEffect(() => {
    let servicesRef = ref(getDatabase(), "services");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data;
        let filteredData = [];
        for (let i = 0; i < 3; i++) {
          filteredData.push(data[i]);
        }
        setServicesData(filteredData);
        setIsLoading(false);
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, []);
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    let handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let backgroundImageForSettingUp =
    windowWidth > 767 ? backgroundImage : backgroundImageForSmallScreen;
  return (
    <>
      <Navbar />
      <div
        className={styles.backgroundImageDiv}
        style={{ backgroundImage: `url(${backgroundImageForSettingUp})` }}
      >
        <div className={styles.backgroundHeadingDiv}>
          {/* <p className={styles.backgroundHeading}>
            Navigating Prosperity : Your Financial Journey Begins here
          </p> */}
          {/* <p className={styles.backgroundDescription}>Trust Upon Us</p> */}
          <p className={styles.backgroundHeading}>Explore Our Top Services</p>
          <ul className={styles.listParent}>
            <li
              className={styles.list}
              onClick={() => navigate("/service/Bookkeeping")}
            >
              Bookkeeping
            </li>
            <li
              className={styles.list}
              onClick={() => navigate("/service/GST Compliances")}
            >
              GST Compliances
            </li>
            <li
              className={styles.list}
              onClick={() => navigate("/service/Income Tax Compliances")}
            >
              Income Tax Compliances
            </li>
            <li
              className={styles.list}
              onClick={() => navigate("/service/Business Registration")}
            >
              Business Registration
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.introHeading}>
        Discover <span className={styles.comapanyName}>Protax Solutions</span> :
        Innovating the Future with Excellence
      </p>
      <p className={styles.introDescription}>
        Welcome to Building Better Business - your premier full-service firm
        dedicated to facilitating seamless business setups in India. Our
        expertise spans a diverse range of domains including FEMA compliance,
        Expatriates Taxation, Accounting Outsourcing, Auditing, and Transaction
        Advisory services.
      </p>
      <p className={styles.introDescription}>
        At Building Better Business, we are driven by a strong set of values
        that underpin everything we do. With a robust presence across the
        country, we are committed to meeting the comprehensive tax planning and
        management consulting requirements of our esteemed clients throughout
        India.
      </p>
      <p className={styles.introDescription}>
        Explore our comprehensive suite of services designed to empower
        businesses with the tools and knowledge they need to thrive. Whether
        you're embarking on a new business venture, navigating complex
        regulatory landscapes, or seeking strategic financial advice, our
        dedicated team is here to guide you every step of the way.
      </p>
      <p className={styles.introDescription}>
        Join us in building a brighter business future. Your success is our
        business!
      </p>
      {/* <ul className={styles.listParentForIntroduction}>
        <li className={styles.listIntro}>
          avail the services of highly qualified, experienced accounting
          professionals.
        </li>
        <li className={styles.listIntro}>
          have more time to run your business without having to think about all
          the numbers and
        </li>
        <li className={styles.listIntro}>
          save resources to run your business successfully.
        </li>
      </ul> */}
      <p className={styles.goalsHeading}>Our Goals</p>
      <p className={styles.goalsDescription}>
        Realizing Goals , Shaping Financial Futures
      </p>
      <ul className={styles.goalsList}>
        {goalsData.map((item, ind) => {
          let uniqueKey = [1, 2, 3];
          return (
            <li className={styles.goals} key={uniqueKey[ind]}>
              {item}
            </li>
          );
        })}
      </ul>
      <p className={styles.whyHeading}>Why Choose Us ?</p>
      <div className={styles.whyChooseDiv}>
        {whyChooseData.map((item, ind) => {
          let images = [safe, qualified];
          let uniqueKey = [1, 2];
          return (
            <div className={styles.whyChooseCard} key={uniqueKey[ind]}>
              <img src={images[ind]} className={styles.whyChooseImages} />
              <p className={styles.whyChooseText}>{item}</p>
            </div>
          );
        })}
      </div>
      <p className={styles.serviceHeading}>Our Services</p>
      <p className={styles.servicesDescription}>
        Elevating Services , Enriching Lives Together
      </p>
      <div className={styles.servicesDiv}>
        {servicesData.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.servicesCard}
              onClick={() => navigate(`/service/${item.name}`)}
            >
              {/* <img src={item.img1} className={styles.serviceImage} /> */}
              <p className={styles.serviceName}>{item.name}</p>
              <p className={styles.serviceDesc}>
                {truncateWords(item.description1, 25)}{" "}
                <span
                  className={styles.viewMore}
                  onClick={() => navigate(`/service/${item.name}`)}
                >
                  View More
                </span>
              </p>
            </div>
          );
        })}
        {!isLoading ? (
          <div
            className={styles.seeAllServicesDiv}
            onClick={() => navigate("/services")}
          >
            <p className={styles.seeAllText}>See all services {"->"}</p>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
