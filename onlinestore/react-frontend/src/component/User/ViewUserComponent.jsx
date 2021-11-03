import React, { Component } from 'react';
import UserService from '../../js/services/UserService';
class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {},
            imgSrc: 'http://localhost:8080/online-store/users/'+this.props.match.params.id+'/image',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then(res => {
            this.setState({user: res.data});
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

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3" style={{marginTop: "10px"}}>
                    <h3 className="text-center">View User Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> User Photo: </label>
                            <div><img src={this.state.imgSrc} alt={"logo"} style={{width: "250px", height: "250px"}}/></div>
                        </div>
                        <div className="row">
                            <label> User First Name: </label>
                            <div> {this.state.user.firstName} </div>
                        </div>
                        <div className="row">
                            <label> User Last Name: </label>
                            <div> {this.state.user.lastName} </div>
                        </div>
                        <div className="row">
                            <label> User Birth Date: </label>
                            <div> {this.state.user.dateOfBirth} </div>
                        </div>
                        <div className="row">
                            <label> User Email: </label>
                            <div> {this.state.user.email} </div>
                        </div>
                        <div className="row">
                            <label> User Phone number: </label>
                            <div> {this.state.user.phoneNumber} </div>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                </div>
            </div>
        );
    }
}

export default ViewUserComponent;