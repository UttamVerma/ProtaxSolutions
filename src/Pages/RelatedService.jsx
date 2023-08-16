import styles from "./RelatedService.module.css";
import Navbar from "../Components/Navbar.jsx";
import { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useNavigate, useParams } from "react-router-dom";
import loadingImg from "../Components/Assets/loadingGif.gif";
let RelatedService = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  let [service, setService] = useState([]);
  let [relatedServices, setRelatedServices] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate=useNavigate();
  let {name} =useParams();
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
    let servicesRef = ref(getDatabase(), "services");
    let onDataChange = (snapshot) => {
      let data = snapshot.val();
      if (data) {
        let servicesArray = data.filter((item) => {
          return item.name == name;
        });
        setService(servicesArray[0]);
        setLoading(false);
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
          if(relatedServicesData.length===2){
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
          <div className={styles.imageDiv}>
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
          </div>
          <p className={styles.serviceHeading}>{service.name}</p>
          <p className={styles.description}>{service.description1}</p>
          <p className={styles.description}>{service.description2}</p>
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
