import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? styles.active : ""} ${styles.nav_item}`
          }
          to="/"
        >
          List
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? styles.active : ""} ${styles.nav_item}`
          }
          to="/create"
        >
          Create
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
