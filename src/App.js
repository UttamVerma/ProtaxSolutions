import './App.css';
import { initializeApp } from "firebase/app";
import { useContext, useEffect, useState } from "react";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue,off } from "firebase/database";
import AllRoutes from './Routes/AllRoutes';
import { AuthContext } from './Context/AuthContextProvider';

function App() {
  let {setServicesData}=useContext(AuthContext);
  let firebaseConfig = {
    apiKey: "AIzaSyAy3b_KQ9SuERsygoLmEJvMZtBYk7TMbuE",
    authDomain: "protaxsolutions-91422.firebaseapp.com",
    projectId: "protaxsolutions-91422",
    storageBucket: "protaxsolutions-91422.appspot.com",
    messagingSenderId: "1061705564004",
    appId: "1:1061705564004:web:68a8bb59b6a1ffea2b4471",
    measurementId: "G-1QKMXCCPNR"
  };
  initializeApp(firebaseConfig);
  getAnalytics();
  useEffect(()=>{
    let servicesRef=ref(getDatabase(),"services");
    let onDataChange=(snapshot)=>{
      let data=snapshot.val();
      if(data){
        let servicesArray=data;
        setServicesData(servicesArray);
      }
    };
    onValue(servicesRef,onDataChange);
    return ()=>{
      off(servicesRef,"value",onDataChange);
    };
  },[]);
  
  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
