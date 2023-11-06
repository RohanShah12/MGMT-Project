import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const singOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    singOut();
    navigate("/login");
  };

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/clients",
      name: "Clients",
      icon: <FaUserAlt />,
    },
    {
      path: "/projects",
      name: "Projects",
      icon: <FaShoppingBag />,
    },
    {
      path: "/consultant",
      name: "Consultants",
      icon: <FaUserAlt />,
    },
    {
      path: "/sow",
      name: "PO",
      icon: <FaUserAlt />,
    },
    {
      path: "/map-sow",
      name: "Mapping PO",
      icon: <FaUserAlt />,
    },
    // {
    //   path: "/analytics",
    //   name: "Analytics",
    //   icon: <FaRegChartBar />,
    // },
  ];
  return (
    <>
      {/* <div
        className="container1"
        style={{ display: "flex", flexDirection: "row", float: "left" }}
      ></div> */}

      <div
        style={{
          width: isOpen ? "16%" : "50px",
          position: "fixed",
        }}
        className="sidebar"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Cirrus Labs
          </h1>
          {/* <div style={{ marginLeft: isOpen ? "70px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div> */}
        </div>
        <br />
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className="logout">
          {/* <navLink className="link" activeclassName="active"> */}
          <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              <Button
                onClick={logout}
                variant="outlined"
                sx={{
                  mt: "10px",
                  mr: "20px",
                  borderRadius: 28,
                  color: "#ffffff",
                  minWidth: "170px",
                  backgroundColor: "#FF9A01",
                }}
              >
                Logout
              </Button>
            </div>
          </div>
          {/* </navLink> */}
        </div>
      </div>
      {/* <div
        style={{
          width: "100%",
          paddingLeft: "16%",
        }}
      >
        <main>{children}</main>
      </div> */}
    </>
  );
};

export default Sidebar;
