import React, {useState,useEffect} from 'react';
import './App.css';
import Header from './Header'
import Footer from './Footer';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Upload from './upload/Upload'
import ViewTransactions from './frauddetection/ViewTransactions';
import SearchTransactions from './searchtransactions/SearchTransactions';
import Login from './login/Login'


function App() {

  const [activeTab, setActiveTab] = useState('1');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  let clearStateSearch = React.createRef();
  let clearStateFileUpload = React.createRef();
  let clearStateViewTransactions = React.createRef();

  const toggle = tab => {
    clearStateSearch.current.resetState();
    clearStateFileUpload.current.resetState();
    clearStateViewTransactions.current.resetState();
    if(activeTab !== tab) setActiveTab(tab);
  }

  useEffect(()=>{
    setIsAuthenticated(localStorage.getItem("authenticated")==='true')
    setUsername(localStorage.getItem("username"))
  },[username]);

  const handleLogin = (username,password) => {
    let loginSuccess = false;
    if(!(username === "" || password === "")) {
      loginSuccess = username === password;
      setIsAuthenticated(loginSuccess);
      setUsername(username);
    }
    localStorage.setItem('authenticated', loginSuccess);
    localStorage.setItem('username', loginSuccess ? username : '');
    return !loginSuccess;
  }

  const handleLogout = () => {
    toggle('1');
    localStorage.setItem('authenticated', false);
    localStorage.setItem('username', '');
    setIsAuthenticated(false);
  }

  const response = isAuthenticated?<div>

  <Header username={username} handleLogout={handleLogout}/>

  <div>
    <Nav tabs>
    <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '1' })}
          onClick={() => { toggle('1'); }}
        >
          Upload transaction records
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '2' })}
          onClick={() => { toggle('2'); }}
        >
          Search transactions
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '3' })}
          onClick={() => { toggle('3'); }}
        >
          View fraudlent transactions 
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent activeTab={activeTab}>
    <TabPane tabId="2">
        <Row>
          <Col sm="12">
            <div className="Search-Transactions-Component">
              <SearchTransactions ref={clearStateSearch}/>
            </div>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="1">
        <Row>
          <Col sm="8">
            <div className="File-upload">
            <div className="Card">
              <Upload ref={clearStateFileUpload} />
            </div>
            </div>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId="3">
        <Row>
          <Col sm="12">
            <ViewTransactions ref={clearStateViewTransactions}/>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  </div>
  <Footer/>

  </div>:<Login handleLogin={handleLogin}/>
  return (
    response
  );
}

export default App;
