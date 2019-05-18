import React from "react";
import './Header.css'

const Header = props => (
  <div className="Header">
    <button onClick={props.handleShowActivity}>activity</button>
    <button>votes</button>
    <button>hot</button>
    <button>week</button>
    <button>month</button>
  </div>
);

export default Header;
