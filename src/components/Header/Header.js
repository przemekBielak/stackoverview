import React from "react";
import './Header.css'
import Button from '@material-ui/core/Button';

const Header = props => (
  <div className="Header">
    <Button onClick={props.handleShowActivity}>activity</Button>
    <Button onClick={props.handleShowVotes}>votes</Button>
    <Button onClick={props.handleShowHot}>hot</Button>
    <Button onClick={props.handleShowWeek}>week</Button>
    <Button onClick={props.handleShowMonth}>month</Button>
  </div>
);

export default Header;
