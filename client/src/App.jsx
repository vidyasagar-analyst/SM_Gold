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

const App = () => {
  return (
    <div className="px-20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<AllCustomers />} />
            <Route path="/customer/:id" element={<CustomerInfo />} />
            <Route path="/add-customer" element={<AddCustomer />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
