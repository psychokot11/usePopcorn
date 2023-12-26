import React, { useState } from "react";
import Search from "./Search";
import Logo from "./Logo";

function Navbar({ query, setQuery, children }) {
    return (
        <nav className="nav-bar">
          <Logo />
          <Search query={query} setQuery={setQuery}/>
          {children}
      </nav>
    )
}

export default Navbar;