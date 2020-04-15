import React,{Component} from 'react';
import {Form,FormGroup,Label,Col,Input,Button,Alert} from 'reactstrap';
import Header from '../Header';
import Footer from '../Footer';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername : "",
            inputPassword : "",
            errorMessage : false
        };
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);    }

    handleUsernameInput(event) {
        this.setState({inputUsername:event.target.value});
    }

    handlePasswordInput(event) {
        this.setState({inputPassword:event.target.value});
    }

    handleLogin() {
        const error = this.props.handleLogin(this.state.inputUsername,this.state.inputPassword);
        console.log(error);
        this.setState({errorMessage:error});
    }


    render() {
        return (
        
            <div style={{width:100+'vw',height:100+'vh',background:'lightgrey'}}>
                <Header />
                <div style={{float:"left"}}></div>
            <div style={{textAlign:'center',width:35+'%', background:'white',borderRadius:30+'px',float:"right",marginTop:15+'vh',marginRight:15+'vh'}}>
                <h2 style={{marginLeft:30,marginBottom:30}}>Please sign in</h2>
                <p textAlign="center">
                <Alert hidden={!this.state.errorMessage} style={{width:80+'%',marginLeft:30+'px'}} color="danger">Sorry, the username or password you have entered is incorrect.</Alert>
                </p>
        <Form style={{marginLeft:30}}>
            <FormGroup row>
                <Label sm={3}>Username :</Label>
                <Col sm={6}>
                <Input type="text" value={this.state.inputUsername} onChange={this.handleUsernameInput} />
                </Col>            
            </FormGroup>
            <FormGroup row>
                <Label sm={3}>Password :</Label>
                <Col sm={6}>
                <Input type="password" value={this.state.inputPassword} onChange={this.handlePasswordInput} />
                </Col>            
            </FormGroup>

            <FormGroup row>
                <Col sm={5} >
                </Col>
                <Col sm={3} >
                <Button style={{marginBottom:5+'vh',marginTop:5+'vh'}} color="primary" onClick={this.handleLogin}>Sign in</Button>
                </Col>            
            </FormGroup>
        </Form>
            </div>
            <Footer />
            </div>
        );
    }
}

export default Login;