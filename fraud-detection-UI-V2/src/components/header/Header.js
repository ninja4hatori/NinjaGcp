import React from "react";
import teamLogo from "./team_logo1.jpg";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="page-banner">
          {this.props.username && (
            <img src={teamLogo} className="team-logo" alt="teamLogo"></img>
          )}
          <p className="header">CREDIT CARD FRAUD DETECTION SYSTEM</p>
        </div>
        {this.props.username && (
          <p className="welcome-message">
            Welcome {this.props.username.toUpperCase()}{" "}
            <input
              className="logout-btn"
              type="button"
              value="Logout"
              onClick={this.props.handleLogout}
            ></input>
          </p>
        )}
      </>
    );
  }
}

export default Header;
