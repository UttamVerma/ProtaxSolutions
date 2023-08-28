import { useContext, useEffect, useState } from "react";
import styles from "./Services.module.css";
import { AuthContext } from "../Context/AuthContextProvider";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import loadingImg from "../Components/Assets/loadingGif.gif";

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
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (servicesData.length > 0) {
      setLoading(true);
    }
  }, [servicesData]);

  useEffect(() => {
    let preloadImages = async () => {
      let imagePromises = servicesData.map((item) => {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.src = item.img1;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setLoading(true);
      } catch (error) {
        console.error("Image preloading error:", error);
      }
    };

    if (servicesData.length > 0) {
      preloadImages();
    }
  }, [servicesData]);

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <p className={styles.exploreHeading}>Explore Our Top Services</p>
        <p className={styles.exploreDescription}>
          Empower Your Journey to Financial Success with Our Proven Services.
          Our team of experienced experts is dedicated to steering you through a
          comprehensive range of financial intricacies, offering personalized
          wealth management and strategic planning that aligns with your unique
          goals. Immerse yourself in a world of our acclaimed services,
          meticulously crafted to pave the way for a future brimming with
          confidence and prosperity.
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
                    {truncateWords(item.description1, 20)}{" "}
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
            <img
              src={loadingImg}
              alt="Loading..."
              className={styles.loadingGif}
            />
          )}
          {loading ? (
            <div className={styles.notSureDiv}>
              <p className={styles.notSureHeading}>
                Not sure what you are looking for?
              </p>
              <p className={styles.notSurePhoneText}>
                Call us at{" "}
                <span className={styles.seperateColorText}>+91-9878856649</span>{" "}
                and we will help you figure out your accounting and taxation
                requirement!
              </p>
              <p className={styles.notSurePhoneText}>
                You can also send us a mail at{" "}
                <span className={styles.seperateColorText}>
                  pprotaxsolutions@gmail.com
                </span>{" "}
                for any requirement.
              </p>
              <p className={styles.notSurePhoneText}>
                You can also visit our office at{" "}
                <span className={styles.seperateColorText}>
                  Plot No 437, 2nd Floor, Industrial Area Phase 2, Chandigarh,
                  160002
                </span>{" "}
                for more information.
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Services;
