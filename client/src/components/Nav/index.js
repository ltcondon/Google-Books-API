import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>

      <a className="navbar-brand" href="/search">
        Find New Books
      </a>

      <a className="navbar-brand" href="/saved">
        My Saved Books
      </a>
    </nav>
  );
}

export default Nav;
