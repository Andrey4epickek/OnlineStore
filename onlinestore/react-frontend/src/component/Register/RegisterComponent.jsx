import React, { Component } from 'react';
import UserService from '../../js/services/UserService';

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            photo: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            email: '',
            password: '',
            file: null,
            phoneNumber: '',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.changePhotoHandler = this.changePhotoHandler.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeBirthDateHandler = this.changeBirthDateHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            email: this.state.email,
            password: this.state.password,
            photo: this.state.photo,
            phoneNumber: this.state.phoneNumber
        };
        console.log('user => ' + JSON.stringify(user));

        let file = this.state.file;

        const userJson = JSON.stringify(user);
        const blob = new Blob([userJson], {
            type: 'application/json'
        });

        let formData = new FormData();
        formData.append('userDto', blob);
        formData.append('photo', file);

        UserService.createUser(formData).then(res => {
            this.props.history.push('/users');
        }).catch(error=> {
            if (error.response) {
                if(error.response.data.status===403){
                    this.setState({errorCode:'errorCode: '+error.response.data.status});
                    this.setState({errorMessage:'errorMessage: '+error.response.data.error});
                }
                else {
                    this.setState({errorId:'errorId: '+error.response.data.id});
                    this.setState({errorCode:'errorCode: '+error.response.data.code});
                    this.setState({errorMessage:'errorMessage: '+error.response.data.message});
                }
                    
              console.log(error.response.data);
            } else if (error.request) {
              console.log(error.request.data);
            } else {
              console.log('Error', error.message);
            }
          })
    }

    changePhotoHandler = (event) => {
        this.setState({file: event.target.files[0]});
        this.setState({photo: event.target.value});
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeBirthDateHandler = (event) => {
        this.setState({dateOfBirth: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changePhoneHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "10px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Register User</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Photo: </label>
                                        <input type="file" name="file" className="form-control"
                                               onChange={this.changePhotoHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input placeholder="FirstName" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler} required pattern="[a-zA-Z]{1,50}"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler} required pattern="[a-zA-Z]{1,50}"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Birth Date: </label>
                                        <input placeholder="Birth Date" name="dateOfBirth" className="form-control"
                                               value={this.state.dateOfBirth} onChange={this.changeBirthDateHandler} required pattern="\d{4}-\d{2}-\d{2}"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email address: </label>
                                        <input placeholder="Email address" name="email" className="form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler} required pattern="^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone number: </label>
                                        <input placeholder="Phone number" name="phoneNumber" className="form-control"
                                               value={this.state.phoneNumber} onChange={this.changePhoneHandler} required pattern="^\+(?:[0-9] ?){1,3}[0-9]{6,9}$"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password: </label>
                                        <input placeholder="Password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.changePasswordHandler} required min="1"/>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
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
export default RegisterComponent;