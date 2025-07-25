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
import CurrMonthCustomers from "./Pages/CurrMonthCustomers";
import InvestmentInfo from "./Pages/InvestmentInfo";
import LoanAmountInfo from "./Pages/LoanAmountInfo";
import Notifications from "./Pages/Notifications";
import InvestmentHistory from "./Pages/InvestmentHistory";
import BalanceInvestment from "./Pages/BalanceInvestment";

const App = () => {
  return (
    <div className="px-5 overflow-x-hidden sm:px-20">
      <AppContextProvider>
        <Router>
          <Navbar />
          <Toaster richColors position="top-right" />

          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            <Route element={<Protected />}>
              <Route path="/" element={<Home />} />
              {/* Admin Access Pages */}
              <Route path="/control-center" element={<ControlCenter />} />
              <Route path="/investment-info" element={<InvestmentInfo />} />
              <Route
                path="/investment-history/:id"
                element={<InvestmentHistory />}
              />
              <Route path="/loan-amount-info" element={<LoanAmountInfo />} />
              <Route
                path="/balance-investment"
                element={<BalanceInvestment />}
              />
              {/* General Pages */}
              <Route path="/customers" element={<AllCustomers />} />
              <Route
                path="/curr-month-customers"
                element={<CurrMonthCustomers />}
              />
              <Route path="/customer/:id" element={<CustomerInfo />} />
              <Route path="/add-customer" element={<AddCustomer />} />
              <Route path="/notifications" element={<Notifications />} />
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
