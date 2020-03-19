import React from "react";
import { Link } from "react-router-dom";

const Header = ({logout}) => {
  return (
    <header className="inner">
      <h2>
        <Link to="/">
          <i className="fas fa-prescription-bottle-alt"></i> RemMedi
        </Link>
      </h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Prescriptions</Link>
          </li>
          <li>
            <Link to="/add">Add Prescription</Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>Log Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
