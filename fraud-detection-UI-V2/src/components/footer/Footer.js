import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="copyright">Copyright @ 2020</div>
        {this.props.showThemeToggler && (
          <div>
            <input
              type="button"
              className="theme-toggler-btn"
              onClick={this.props.themeHandler}
              value="Toggle theme"
            />
          </div>
        )}
      </div>
    );
  }
}

export default Footer;
