import React, { Component } from 'react';
import AuthService from '../../js/services/AuthService';

class LogoutComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        
        this.logout = this.logout.bind(this);
    }

    

    logout = (e) => {
        e.preventDefault();
        AuthService.logout();
        this.props.history.push('/');
        
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
                            <h3 className="text-center">Logout page</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Are you sure you want to logout? </label>
                                    </div>
                                    <button className="btn btn-success" onClick={this.logout}>Logout</button>
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

export default LogoutComponent;