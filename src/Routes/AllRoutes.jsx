import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";
import IndivisualServices from "../Pages/IndivisualService";
import RelatedService from "../Pages/RelatedService";
import NotFound from "../Pages/NotFound";
import Admin from "../Pages/Admin";
let AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/service/:name" element={<IndivisualServices />} />
      <Route path="/service/related/:name" element={<RelatedService />} />
      <Route path="/proSolAdminForAnalyse" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;