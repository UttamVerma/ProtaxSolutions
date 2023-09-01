import styles from "./RelatedService.module.css";
import Navbar from "../Components/Navbar.jsx";
import { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useNavigate, useParams } from "react-router-dom";
import loadingImg from "../Components/Assets/loadingGif.gif";
let truncateWords = (text, maxWords) => {
  let words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " " + "...";
  }
  return text;
};

let RelatedService = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  let [service, setService] = useState([]);
  let [relatedServices, setRelatedServices] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let [featuresHeading, setFeaturesHeading] = useState("");
  let [featuresList, setFeaturesList] = useState([]);
  let [benefitsHeading, setBenefitsHeading] = useState("");
  let [benefitsList, setBenefitsList] = useState([]);
  let { name } = useParams();
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
    let servicesRef = ref(getDatabase(), "services");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data.filter((item) => {
          return item.name == name;
        });
        setService(servicesArray[0]);
        setLoading(false);
        if (servicesArray[0]?.features_Heading) {
          setFeaturesHeading(servicesArray[0].features_Heading);
          setFeaturesList(servicesArray[0].features);
        }
        if (servicesArray[0]?.benefits_Heading) {
          setBenefitsHeading(servicesArray[0].benefits_Heading);
          setBenefitsList(servicesArray[0].benfits);
        }
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, [name]);
  useEffect(() => {
    let servicesRef = ref(getDatabase(), "services");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data.filter((item) => {
          return item.name !== name;
        });
        let relatedServicesData = [];
        for (let i = 0; i < servicesArray.length; i = i + 2) {
          if (data[i].name !== name) {
            relatedServicesData.push(data[i]);
          }
          if (relatedServicesData.length === 2) {
            break;
          }
        }
        setRelatedServices(relatedServicesData);
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, []);
  return (
    <>
      <Navbar />
      {!loading ? (
        <div className={styles.main}>
          {/* <div className={styles.imageDiv}>
            <img
              className={styles.serviceImage}
              src={service.img1}
              alt={`${service.name}`}
            />
            <img
              className={styles.serviceImage}
              src={service.img2}
              alt={`${service.name}`}
            />
          </div> */}
          <p className={styles.serviceHeading}>{service.name}</p>
          <p className={styles.description}>{service.description1}</p>
          <p className={styles.description}>{service.description2}</p>
          {featuresHeading && (
            <p className={styles.featuresHeading}>{featuresHeading}</p>
          )}
          {featuresList &&
            featuresList.map((item, index) => {
              return (
                <ul className={styles.featuresList} key={index}>
                  <li className={styles.featuresListItem}>{item}</li>
                </ul>
              );
            })}
          {benefitsHeading && (
            <p className={styles.benefitsHeading}>{benefitsHeading}</p>
          )}
          {benefitsList &&
            benefitsList.map((item, index) => {
              return (
                <ul className={styles.featuresList} key={index}>
                  <li className={styles.featuresListItem}>{item}</li>
                </ul>
              );
            })}
          <p className={styles.relatedHeading}>
            Some of the related service(s) are :-
          </p>
          <div className={styles.relatedServicesDiv}>
            {relatedServices.map((item) => {
              return (
                <div
                  className={styles.relatedServiceCard}
                  key={item.id}
                  onClick={() => navigate(`/service/${item.name}`)}
                >
                  <img className={styles.relatedServiceImage} src={item.img1} />
                  <p className={styles.relatedServiceCardHeading}>
                    {item.name} {"->"}
                  </p>
                  <p className={styles.relatedServiceDesc}>
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
          </div>
          <div className={styles.acceptanceDiv}>
            <p className={styles.acceptanceText}>
              If you’re ready to move forward with Protax Solutions as your
              accounting services provider, we will then reach out to discuss
              your immediate and ongoing accounting needs. Just give us a call
              or mail us regarding your decision.
            </p>
          </div>
          <Footer />
        </div>
      ) : (
        <img className={styles.loadingGif} src={loadingImg} />
      )}
    </>
  );
};
export default RelatedService;
