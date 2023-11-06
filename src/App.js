import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Clients from "./pages/Clients.jsx";
import Analytics from "./pages/Analytics.jsx";
import Comment from "./pages/Comment.jsx";
import Projects from "./pages/Projects.jsx";
import ProductList from "./pages/ProductList.jsx";
import Consultant from "./pages/Consultant";
import Login from "./pages/Login";
import { RequireAuth } from "react-auth-kit";
import Register from "./pages/Register";
import Sow from "./pages/Sow";
import Mapsow from "./pages/Mapsow";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <Dashboard />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/clients"
        element={
          <RequireAuth loginPath="/login">
            <Clients />
          </RequireAuth>
        }
      ></Route>

      <Route
        path="/projects"
        element={
          <RequireAuth loginPath="/login">
            <Projects />
          </RequireAuth>
        }
      ></Route>

      <Route
        path="/consultant"
        element={
          <RequireAuth loginPath="/login">
            <Consultant />
          </RequireAuth>
        }
      ></Route>

      <Route
        path="/sow"
        element={
          <RequireAuth loginPath="/login">
            <Sow />
          </RequireAuth>
        }
      ></Route>

      <Route
        path="/map-sow"
        element={
          <RequireAuth loginPath="/login">
            <Mapsow />
          </RequireAuth>
        }
      ></Route>

      {/* <Route
        path="/analytics"
        element={
          <RequireAuth loginPath="/login">
            <Analytics />
          </RequireAuth>
        }
      ></Route> */}
    </Routes>
  );
};

export default App;
