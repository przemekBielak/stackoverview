import React from "react";
import './Header.css'

const Header = props => (
  <div className="Header">
    <button onClick={props.handleShowActivity}>activity</button>
    <button onClick={props.handleShowVotes}>votes</button>
    <button onClick={props.handleShowHot}>hot</button>
    <button onClick={props.handleShowWeek}>week</button>
    <button onClick={props.handleShowMonth}>month</button>
  </div>
);

export default Header;
