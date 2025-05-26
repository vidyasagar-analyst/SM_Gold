import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Protected from "./Components/Protected";
import Home from "./Pages/Home";
import CustomerInfo from "./Pages/CustomerInfo";
import Navbar from "./Components/Navbar";
import AddCustomer from "./Pages/AddCustomer";
import AllCustomers from "./Pages/AllCustomers";
import AppContextProvider from "./Utils/AppContext";

import { Toaster } from "sonner";
import Missing from "./Pages/Missing";
import Footer from "./Components/Footer";
import ControlCenter from "./Pages/ControlCenter";

const App = () => {
  return (
    <div className="px-20">
      <AppContextProvider>
        <Router>
          <Navbar />
          <Toaster richColors position="top-right" />

          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            <Route element={<Protected />}>
              <Route path="/" element={<Home />} />
              <Route path="/control-center" element={<ControlCenter />} />
              <Route path="/customers" element={<AllCustomers />} />
              <Route path="/customer/:id" element={<CustomerInfo />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </AppContextProvider>
    </div>
  );
};

export default App;
