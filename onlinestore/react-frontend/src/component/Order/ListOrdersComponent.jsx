import React, { Component } from 'react';
import OrderService from '../../js/services/OrderService';

class ListOrdersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
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
        this.pageNext = this.pageNext.bind(this);
        this.pagePrevious = this.pagePrevious.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changeSortByHandler = this.changeSortByHandler.bind(this);
        this.changeDirectionHandler = this.changeDirectionHandler.bind(this);
        this.filter = this.filter.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.viewOrder = this.viewOrder.bind(this);
    }

    componentDidMount() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        if(this.state.token==='login'){
            this.props.history.push('/login');
        } else {
        OrderService.getOrders(page,size,sortBy,direction).then((res) => {
            this.setState({orders: res.data});
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
        OrderService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
    }
    }

    pageNext() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        OrderService.getOrders(page+1,size,sortBy,direction).then((res) => {
                this.setState({orders: res.data});
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
        OrderService.getOrders(page-1,size,sortBy,direction).then((res) => {
                this.setState({orders: res.data});
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
        OrderService.getOrders(0,size,sortBy,direction).then((res) => {
                this.setState({orders: res.data});
                this.setState({currentPage: 1});
                this.setState({errorId:'' });
                this.setState({errorCode:'' });
                this.setState({errorMessage:'' });
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
        OrderService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
    }

    deleteOrder(id){
        OrderService.deleteOrder(id).then( res => {
            this.setState({orders: this.state.orders.filter(order => order.id !==id)});
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

    viewOrder(id){
        this.props.history.push(`/view-order/${id}`);
    }


    render() {
        return (
            <div>
                <h2 className="text-center">Orders List</h2>
            
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
                            <th> Order id</th>
                            <th> User email</th>
                            <th> Order count</th>
                            <th> Order price</th>
                            <th> Order status</th>
                            <th> Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.orders.map(
                                order =>
                                    <tr key={order.id}>
                                        <td> {order.id} </td>
                                        <td> {order.createdBy} </td>
                                        <td> {order.count} </td>
                                        <td> {order.price} </td>
                                        <td> {order.status} </td>
                                        <td>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteOrder(order.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewOrder(order.id)}
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

export default ListOrdersComponent;