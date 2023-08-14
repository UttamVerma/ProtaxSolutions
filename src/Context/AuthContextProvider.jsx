import { createContext, useState } from "react"


export let AuthContext=createContext()

let AuthContextProvider=({children})=>{
    let [servicesData,setServicesData]=useState([]);
    let dataObj={
        servicesData,
        setServicesData
    }
    return(
        <AuthContext.Provider value={dataObj}>{children}</ AuthContext.Provider>
    )
}
export default AuthContextProvider;