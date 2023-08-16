import styles from "./NotFound.module.css";
import not from "../Components/Assets/notFound.png"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
let NotFound=()=>{
    let navigate=useNavigate();
    useEffect(()=>{
        window.scroll({ top: 0, behavior: "smooth" });
    },[]);
    return (
        <>
        <div className={styles.main}>
            <img src={not} className={styles.image}/>
            <p className={styles.textHeading} onClick={()=> navigate("/")}>Move back to Home {"->"}</p>
        </div>
        </>
    )
}
export default NotFound;