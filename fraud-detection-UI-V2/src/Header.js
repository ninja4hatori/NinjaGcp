import React from "react";
import teamLogo from "./team_logo1.jpg";

class Header extends React.Component {
  render() {
    const renderWelcomeMessage = this.props.username && (
      <p style={{ textAlign: "right", marginRight: 0 + "%", marginBottom: 0 }}>
        Welcome {this.props.username.toUpperCase()}{" "}
        <input
          style={{ marginLeft: 20 + "px", background: "white", color: "green" }}
          type="button"
          value="Logout"
          onClick={this.props.handleLogout}
        ></input>
      </p>
    );
    return (
      <div
        style={{ backgroundColor: "#006A4B", color: "white", width: 100 + "%" }}
      >
        <div
          style={{
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: 768 + "px",
          }}
        >
          {this.props.username && (
            <img
              src={teamLogo}
              style={{
                height: 104,
                marginTop: 27,
                width: 219 + "px",
                marginLeft: 2 + "px",
              }}
              alt="teamLogo"
            ></img>
          )}
          <h1 style={{ margin: "auto" }}>CREDIT CARD FRAUD DETECTION SYSTEM</h1>
        </div>
        {renderWelcomeMessage}
      </div>
    );
  }
}

export default Header;
