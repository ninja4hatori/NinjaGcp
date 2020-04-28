import React, { Component } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import SearchTransactions from "./components/searchtransactions/SearchTransactions";
import Upload from "./components/upload/Upload";
import ViewTransactions from "./components/frauddetection/ViewTransactions";
import { TabContent, TabPane, Nav, NavItem, NavLink, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.clearStateSearch = React.createRef();
    this.clearStateFileUpload = React.createRef();
    this.clearStateViewTransactions = React.createRef();
    this.state = {
      theme: localStorage.getItem("theme"),
      showThemeToggler:
        localStorage.getItem("showThemeToggler") === "" ||
        localStorage.getItem("showThemeToggler") === "true",
      isAuthenticated: localStorage.getItem("authenticated") === "true",
      username: localStorage.getItem("username"),
      activeTab: "1",
    };
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  handleLogin = (username, password) => {
    let loginSuccess = false;
    if (!(username === "" || password === "")) {
      loginSuccess = username === password;
      this.setState({
        isAuthenticated: loginSuccess,
        username: username,
        showThemeToggler: false,
      });
    }
    localStorage.setItem("authenticated", loginSuccess);
    localStorage.setItem("username", loginSuccess ? username : "");
    localStorage.setItem("showThemeToggler", loginSuccess ? false : true);
    return !loginSuccess;
  };

  toggle = (tab) => {
    this.clearStateSearch.current.resetState();
    this.clearStateFileUpload.current.resetState();
    this.clearStateViewTransactions.current.resetState();
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  handleLogout = () => {
    this.toggle("1");
    localStorage.setItem("authenticated", false);
    localStorage.setItem("username", "");
    localStorage.setItem("showThemeToggler", true);
    this.setState({ isAuthenticated: false, showThemeToggler: true });
  };

  toggleTheme() {
    const theme = this.state.theme === "lbg" ? "rbs" : "lbg";
    localStorage.setItem("theme", theme);
    this.setState({ theme });
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(function () {
      document.documentElement.classList.remove("theme-transition");
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.state.isAuthenticated ? (
          <Header
            username={this.state.username}
            handleLogout={this.handleLogout}
          />
        ) : (
          <Header />
        )}
        <div
          className={`${
            this.state.isAuthenticated
              ? "content-area-loggedin"
              : "content-area"
          }`}
        >
          {this.state.isAuthenticated ? (
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    style={{
                      borderColor: "var(--themeColor) #dee2e6 #dee2e6",
                    }}
                    className={`${
                      this.state.activeTab === "1" ? "active" : "inactive"
                    }`}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Upload transaction records
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`${
                      this.state.activeTab === "3" ? "active" : "inactive"
                    }`}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    View fraudulent transactions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`${
                      this.state.activeTab === "2" ? "active" : "inactive"
                    }`}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Search transactions
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="2">
                  <Col sm="12">
                    <div className="Search-Transactions-Component">
                      <SearchTransactions ref={this.clearStateSearch} />
                    </div>
                  </Col>
                </TabPane>
                <TabPane tabId="1">
                  <Col sm="12">
                    <div className="File-upload">
                      <Upload ref={this.clearStateFileUpload} />
                    </div>
                  </Col>
                </TabPane>
                <TabPane tabId="3">
                  <Col sm="12">
                    <ViewTransactions ref={this.clearStateViewTransactions} />
                  </Col>
                </TabPane>
              </TabContent>
            </div>
          ) : (
            <Login handleLogin={this.handleLogin} />
          )}
        </div>
        <Footer
          themeHandler={this.toggleTheme}
          showThemeToggler={this.state.showThemeToggler}
        />
      </div>
    );
  }
}

export default App;
