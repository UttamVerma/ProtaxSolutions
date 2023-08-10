import { createContext } from "react"


export let AuthContext=createContext()

let AuthContextProvider=({children})=>{
    let x={}
    return(
        <AuthContext.Provider value={x}>{children}</ AuthContext.Provider >
    )
}
export default AuthContextProvider;