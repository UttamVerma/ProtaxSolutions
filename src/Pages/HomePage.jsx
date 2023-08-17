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
let HomePage = () => {
  let [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  let [servicesData, setServicesData] = useState([]);
  let [whyChooseData, setWhyChooseData] = useState([]);
  let [goalsData, setGoalsData] = useState([]);
  let firebaseConfig = {
    apiKey: "AIzaSyAy3b_KQ9SuERsygoLmEJvMZtBYk7TMbuE",
    authDomain: "protaxsolutions-91422.firebaseapp.com",
    projectId: "protaxsolutions-91422",
    storageBucket: "protaxsolutions-91422.appspot.com",
    messagingSenderId: "1061705564004",
    appId: "1:1061705564004:web:68a8bb59b6a1ffea2b4471",
    measurementId: "G-1QKMXCCPNR",
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
  return (
    <>
      <Navbar />
      <div
        className={styles.backgroundImageDiv}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.backgroundHeadingDiv}>
          <p className={styles.backgroundHeading}>
            Navigating Prosperity : Your Financial Journey Begins here
          </p>
          <p className={styles.backgroundDescription}>Trust Upon Us</p>
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
        Discover <span className={styles.comapanyName}>ProTax Solutions</span> :
        Innovating the Future with Excellence
      </p>
      <p className={styles.introDescription}>
        Protax Solutions is proud to be a business accounting services.
      </p>
      <p className={styles.introDescription}>
        Whether your business is new or old, it needs efficient accounting
        services for growth and sustainability. Having your books in top shape
        all year round is an achievement that can help your business function
        smoothly and provide grounds for sound and promising business decisions.
      </p>
      <p className={styles.introDescription}>
        Protax Solutions to take care of all you’re accounting needs, you will
        be ensuring yourself a step in the right direction. By letting us be
        your professional accountant you will:
      </p>
      <ul className={styles.listParentForIntroduction}>
        <li className={styles.listIntro}>
          avail the services of highly qualified, experienced accounting
          professionals.
        </li>
        <li className={styles.listIntro}>
          have more time to run your business without having to think about all the
          numbers and
        </li>
        <li className={styles.listIntro}>
          save resources to run your business successfully.
        </li>
      </ul>
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
              <img src={item.img1} className={styles.serviceImage} />
              <p className={styles.serviceName}>{item.name}</p>
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
