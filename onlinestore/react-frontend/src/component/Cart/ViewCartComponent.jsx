import React, { Component } from 'react';
import CartService from '../../js/services/CartService';
import OrderService from '../../js/services/OrderService';

class ViewCartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            cart: {},
            cartProducts: [],
            errorId: '',
            errorCode: '',
            errorMessage: '',
            total: ''
        }
        this.clearCart = this.clearCart.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
    }

    componentDidMount() {
        CartService.getCart().then(res => {
            this.setState({cart: res.data});
            this.setState({cartProducts: res.data.productDtos});
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
          CartService.getTotalPrice().then((res)=>{
            this.setState({total: res.data});
        });
    }

    clearCart(id){
        CartService.clearCart(id).then(res => {
            this.props.history.push('/products');
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

    createOrder(id){
        OrderService.createOrder(id).then(res => {
            this.props.history.push('/products');
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

    deleteFromCart(id){
        CartService.deleteFromCart(id).then(res => {
            this.props.history.push('/products');
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

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3" style={{marginTop: "10px"}}>
                    <h3 className="text-center">View Cart Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> Product Name</th>
                                        <th> Product Price</th>
                                        <th> Product Count</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.cartProducts.map(
                                            cartProduct =>
                                                <tr key={cartProduct.pk.product.id}>
                                                    <td> {cartProduct.pk.product.name} </td>
                                                    <td> {cartProduct.pk.product.price} </td>
                                                    <td> {cartProduct.quantity} </td>
                                                    <td>
                                                        <button style={{marginLeft: "10px"}}
                                                                onClick={() => this.deleteFromCart(cartProduct.pk.product.id)}
                                                                className="btn btn-danger">Delete
                                                        </button>
                                                        <button style={{marginLeft: "10px"}}
                                                                onClick={() => this.viewProduct(cartProduct.pk.product.id)}
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
                            <label>Total price: {this.state.total}</label>
                        </div>
                        <button
                             onClick={() => this.clearCart(this.state.cart.id)}
                                className="btn btn-danger">Clear Cart
                        </button>
                        <button
                             onClick={() => this.createOrder(this.state.cart.id)}
                                className="btn btn-primary" style={{marginLeft: "10px"}}>Create Order
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

export default ViewCartComponent;