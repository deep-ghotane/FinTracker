import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";
import Auth from "./auth/Auth";
import { useUser } from "./context/userContext";
import VerifyEmail from "./pages/VerifyEmail";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/transactionActions";

function App() {
  const [count, setCount] = useState(0);
  const { setUser, autoLogin, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    // first call
    autoLogin();
    // intrval call
    setInterval(autoLogin, 180000);
  }, []);

  // const fetchTransaction = async () => {
  //   // fetch the token from localstorage
  //   let data = await getTransation();

  //   console.log(data);
  //   dispatch(setTransactions(data.transactions));
  // };

  useEffect(() => {
    user && user._id ? dispatch(fetchTransactions()) : "";
  }, [user?._id]);

  return (
    <>
      {/* Define the routes */}
      <div className="wrapper">
        <Routes>
          <Route path="*" element={<DefaultLayout />}>
            {/* Public */}
            <Route path="" element={<Login />} />
            {/* Login */}
            <Route path="login" element={<Login />} />
            {/* signup */}
            <Route path="signup" element={<Signup />} />
            {/* Verify */}
            <Route path="verify-email" element={<VerifyEmail />} />

            {/* Private  */}
            {/* dashboard */}
            <Route
              path="dashboard"
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
            {/* transaction */}
            <Route
              path="transaction"
              element={
                <Auth>
                  <Transaction />
                </Auth>
              }
            />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
