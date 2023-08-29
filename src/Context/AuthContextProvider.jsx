import { createContext, useState } from "react"


export let AuthContext=createContext()

let AuthContextProvider=({children})=>{
    let [servicesData,setServicesData]=useState([]);
    let [showQueryDiv,setShowQueryDiv]=useState(false);
    let [showQueryData, setShowQueryData] = useState(false);
    let dataObj={
        servicesData,
        setServicesData,
        showQueryDiv,
        setShowQueryDiv,
        showQueryData,
        setShowQueryData
    }
    return(
        <AuthContext.Provider value={dataObj}>{children}</ AuthContext.Provider>
    )
}
export default AuthContextProvider;