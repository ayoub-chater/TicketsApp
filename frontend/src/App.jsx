import { useState, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router";
import api from "./lib/axios";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import TicketDetailPage from "./pages/TicketDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await api.post("/auth/verify", null,{
        headers: { jwtToken: localStorage.token }
      });

      const parseRes = res.data;

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

  return (
    <div className="relative h-full w-full h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage setAuth={setAuth} /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ?<CreatePage setAuth={setAuth} /> : <Navigate to="/login" /> } />
        <Route path="/ticket/:id" element={isAuthenticated ?<TicketDetailPage setAuth={setAuth} /> : <Navigate to="/login" /> } />
        <Route path="/login" element={!isAuthenticated ?<LoginPage setAuth={setAuth} /> : <Navigate to="/" /> } />
        <Route path="/register" element={!isAuthenticated ?<RegisterPage setAuth={setAuth} /> : <Navigate to="/" /> } />
        <Route path="*" element={<div className="text-center text-2xl">Page Not Found</div>} />
      </Routes>
    </div>
  );
};
export default App;
