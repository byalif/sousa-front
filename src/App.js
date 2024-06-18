import "./App.css";
import Navbar from "./Components/Navbar.js";
import Header from "./Components/Header.js";
import Custom from "./Components/Custom.js";
import Details from "./Components/Details.js";
import Programs from "./Components/Programs.js";
import ProgramsSolo from "./Components/ProgramsSolo.js";
import Coaching from "./Components/Coaching.js";
import Footer from "./Components/Footer.js";
import AdminPanel from "./Components/AdminPanel.js";
import Checkout from "./Components/Checkout.js";
import Success from "./Components/Success.js";
import Invoices from "./Components/Invoices.js";
import About from "./Components/About.js";
import Signin from "./Components/Signin.js";
import ClientInquiries from "./Components/ClientInquiries.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/programs" element={<ProgramsSolo />} />
          <Route path="/questions" element={<AdminPanel />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/inquiries" element={<ClientInquiries />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

const Home = () => {
  return (
    <>
      <Header />

      <Custom />

      <Details />

      <Programs />
    </>
  );
};

export default App;
