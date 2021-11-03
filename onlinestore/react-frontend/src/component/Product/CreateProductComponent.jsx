import React, { Component } from 'react';
import ProductService from '../../js/services/ProductService';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            price: '',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price
        };
        console.log('product => ' + JSON.stringify(product));

        ProductService.createProduct(product).then(res => {
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

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    cancel() {
        this.props.history.push('/products');
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "10px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Add Product</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name: </label>
                                        <input type="text" placeholder="Name" name="Name" className="form-control"
                                               value={this.state.name} onChange={this.changeNameHandler} required pattern="[a-zA-Z]{1,50}"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Price: </label>
                                        <input type="number" placeholder="Price" name="price" className="form-control"
                                               value={this.state.price} onChange={this.changePriceHandler} required min="1" max="100500"/>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveProduct}>Save</button>
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

export default CreateProductComponent;