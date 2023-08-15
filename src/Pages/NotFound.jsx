import styles from "./NotFound.module.css";
import not from "../Components/Assets/notFound.png"
import { useNavigate } from "react-router-dom";
let NotFound=()=>{
    let navigate=useNavigate();
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