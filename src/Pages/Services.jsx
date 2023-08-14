import { useContext, useEffect, useState } from "react";
import styles from "./Services.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

let truncateWords = (text, maxWords) => {
  let words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " " + "...";
  }
  return text;
};

let Services = () => {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { servicesData } = useContext(AuthContext);
  useEffect(() => {
    if (servicesData.length > 0) {
      setLoading(true);
      console.log(servicesData);
    }
  }, [servicesData]);
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <p className={styles.exploreHeading}>Explore Our Top Services</p>
        <p className={styles.exploreDescription}>
          Unlock Financial Success with Our Trusted Services. Our experienced
          experts guide you through a wide array of financial matters, from
          personalized wealth management to strategic planning. Explore our
          popular services to secure your future with confidence.
        </p>
        <div className={styles.servicesCardParentDiv}>
          {loading ? (
            servicesData.map((item) => {
              return (
                <div
                  className={styles.serviceCard}
                  key={item.id}
                  onClick={() => navigate(`/service/${item.name}`)}
                >
                  <img
                    src={item.img1}
                    alt={`${item.name} image`}
                    className={styles.serviceImage}
                  />
                  <p className={styles.serviceName}>{item.name}</p>
                  <p className={styles.serviceDesc}>
                    {truncateWords(item.description1, 30)}{" "}
                    <span
                      className={styles.viewMore}
                      onClick={() => navigate(`/service/${item.name}`)}
                    >
                      View More
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Services;
