import React, { Component } from 'react';
import AuthService from '../../js/services/AuthService';

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
        
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.login = this.login.bind(this);
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    login = (e) => {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log('user => ' + JSON.stringify(user));
        AuthService.login(user).then(res => {
            this.props.history.push('/');
            localStorage.setItem("app_token",'Bearer ' + res.data.token);
        })
    }
    cancel() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "10px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Login page</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Email address: </label>
                                        <input placeholder="Email address" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.login}>Login</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                            style={{margin: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;