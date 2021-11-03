import React, { Component } from 'react';
import UserService from '../../js/services/UserService';

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            page: 0,
            size: 10,
            sortBy: 'id',
            direction: 'ASC',
            token: localStorage.getItem("app_token"),
            total: 1,
            currentPage: 1,
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.pageNext = this.pageNext.bind(this);
        this.pagePrevious = this.pagePrevious.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changeSortByHandler = this.changeSortByHandler.bind(this);
        this.changeDirectionHandler = this.changeDirectionHandler.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        if(this.state.token==='login'){
            this.props.history.push('/login');
        } else {
        UserService.getUsers(page,size,sortBy,direction).then((res) => {
            this.setState({users: res.data});
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
        UserService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
            }
    }

    addUser() {
        this.props.history.push('/add-user');
    }

    pageNext() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        UserService.getUsers(page+1,size,sortBy,direction).then((res) => {
                this.setState({users: res.data});
                this.setState({page: this.state.page+1});
                this.setState({currentPage: this.state.currentPage+1});
        }).catch(error=> {
            if (error.response) {
                this.setState({errorId:'errorId: '+error.response.data.id});
                this.setState({errorCode:'errorCode: '+error.response.data.code});
                this.setState({errorMessage:'errorMessage: '+error.response.data.message});
              console.log(error.response.data);
            } else if (error.request) {
              console.log(error.request.data);
            } else {
              console.log('Error', error.message);
            }
          });
    }

    pagePrevious() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        UserService.getUsers(page-1,size,sortBy,direction).then((res) => {
                this.setState({users: res.data});
                this.setState({page: this.state.page-1});
                this.setState({currentPage: this.state.currentPage-1});
        });
    }

    changeSizeHandler = (event) => {
        this.setState({size: event.target.value});
    }

    changeSortByHandler = (event) => {
        this.setState({sortBy: event.target.value});
    } 

    changeDirectionHandler = (event) => {
        this.setState({direction: event.target.value});
    } 

    filter(){
        this.setState({page: 0});
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        UserService.getUsers(0,size,sortBy,direction).then((res) => {
                this.setState({users: res.data});
                this.setState({currentPage: 1});
                this.setState({error:'' });
        }).catch(error=> {
            if (error.response) {
                this.setState({errorId:'errorId: '+error.response.data.id});
                this.setState({errorCode:'errorCode: '+error.response.data.code});
                this.setState({errorMessage:'errorMessage: '+error.response.data.message});
              console.log(error.response.data);
            } else if (error.request) {
              console.log(error.request.data);
            } else {
              console.log('Error', error.message);
            }
          });
        UserService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/update-user/${id}`);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !==id)});
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
          });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Users List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <div className="row" style={{marginTop: "10px",marginBottom: "10px"}}>
                    <div>
                    <label>Page size: </label>
                    <input placeholder="Size" name="size" className="form-control"
                            value={this.state.size} onChange={this.changeSizeHandler}/>
                    </div>
                    <div style={{marginLeft: "10px"}}>
                    <label>Sort by: </label>    
                    <input placeholder="Sort by" name="sortBy" className="form-control"
                            value={this.state.sortBy} onChange={this.changeSortByHandler}/>
                    </div>
                    <div style={{marginLeft: "10px"}}>
                    <label>Direction: </label>    
                    <input placeholder="Direction" name="direction" className="form-control"
                            value={this.state.direction} onChange={this.changeDirectionHandler}/>
                    </div>
                    <div style={{marginLeft: "10px"}}>
                        <button onClick={() => this.filter()}
                                className="btn btn-primary">Filter
                        </button>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> User First Name</th>
                            <th> User Last Name</th>
                            <th> Birth Date</th>
                            <th> User Email</th>
                            <th> Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td> {user.firstName} </td>
                                        <td> {user.lastName} </td>
                                        <td> {user.dateOfBirth} </td>
                                        <td> {user.email} </td>
                                        <td>
                                            <button onClick={() => this.editUser(user.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteUser(user.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewUser(user.id)}
                                                    className="btn btn-info">View
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign: 'center'}}>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                    <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                </div>
                <div style={{textAlign: 'center'}}>
                    <button className="btn btn-primary" onClick={this.pagePrevious}>Previous</button>
                    <label style={{marginLeft: "10px",fontSize: "15pt"}}>{this.state.currentPage}</label>
                    <label style={{fontSize: "15pt"}}>/{this.state.total}</label>
                    <button className="btn btn-primary" onClick={this.pageNext} style={{marginLeft: "10px"}}>Next</button>
                </div>
            </div>
        );           
    }
}

export default ListUsersComponent;