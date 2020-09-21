import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logOut = () => {
    sessionStorage.clear();
  };

  const handleButton = () => {
    if (sessionStorage.getItem("user_id") === null) {
      return (
        <NavItem>
          <NavLink href="/login">Log in</NavLink>
          <NavLink href="/signup">Sign up</NavLink>
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          <NavLink href="/logout" onClick={logOut}>
            Log out
          </NavLink>
        </NavItem>
      );
    }
  };

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/peeps" className="mr-auto">
          Chwitters, {sessionStorage.getItem("username")}
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>{handleButton()}</Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
