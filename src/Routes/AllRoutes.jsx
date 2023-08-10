import {Routes,Route} from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";
import IndivisualServices from "../Pages/IndivisualService";
let AllRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/service/:name" element={<IndivisualServices/>}/>
        </Routes>
    )
}

export default AllRoutes;