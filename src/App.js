import "./App.css";
import { initializeApp } from "firebase/app";
import { useContext, useEffect, useState } from "react";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, off } from "firebase/database";
import AllRoutes from "./Routes/AllRoutes";
import { AuthContext } from "./Context/AuthContextProvider";

function App() {
  let { setServicesData } = useContext(AuthContext);
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
        let servicesArray = data;
        setServicesData(servicesArray);
      }
    };
    onValue(servicesRef, onDataChange);
    return () => {
      off(servicesRef, "value", onDataChange);
    };
  }, []);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
