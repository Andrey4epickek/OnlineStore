import React, { Component } from 'react';
import OrderService from '../../js/services/OrderService';

class ViewOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            order: {},
            products: [],
            errorId: '',
            errorCode: '',
            errorMessage: '',
            total: ''
        }
        this.viewProduct = this.viewProduct.bind(this);
        this.payForOrder = this.payForOrder.bind(this);
    }

    componentDidMount() {
        OrderService.getOrderById(this.state.id).then(res => {
            this.setState({order: res.data});
            this.setState({products: res.data.productDtos});
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

    viewProduct(id){
        this.props.history.push(`/view-product/${id}`);
    }

    payForOrder(id){
        OrderService.payForOrder(id).then(res => {
            this.props.history.push('/orders');
        });
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3" style={{marginTop: "10px"}}>
                    <h3 className="text-center">View Order Details</h3>
                    <div className="card-body">
                    <div className="row">
                            <label>User email: {this.state.order.createdBy}</label>
                        </div>
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> Product Name</th>
                                        <th> Product price</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.products.map(
                                            product =>
                                                <tr key={product.id}>
                                                    <td> {product.name} </td>
                                                    <td> {product.price} </td>
                                                    <td>
                                                        <button style={{marginLeft: "10px"}}
                                                                onClick={() => this.viewProduct(product.id)}
                                                                className="btn btn-info">View
                                                        </button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <label>Total cout: {this.state.order.count}</label>
                            <label style={{marginLeft: "10px"}}>Total price: {this.state.order.price}</label>
                            <label style={{marginLeft: "10px"}}>Order status: {this.state.order.status}</label>
                        </div>
                        <button
                             onClick={() => this.payForOrder(this.state.order.id)}
                                className="btn btn-primary">Pay
                        </button>
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

export default ViewOrderComponent;