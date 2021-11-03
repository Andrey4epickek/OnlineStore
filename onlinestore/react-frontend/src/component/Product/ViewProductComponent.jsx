import React, { Component } from 'react';
import ProductService from '../../js/services/ProductService';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {},
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        ProductService.getProductById(this.state.id).then(res => {
            this.setState({product: res.data});
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
                    <h3 className="text-center">View Product Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label> Product Name: </label>
                            <div> {this.state.product.name} </div>
                        </div>
                        <div className="row">
                            <label> Product Price: </label>
                            <div> {this.state.product.price} </div>
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

export default ViewProductComponent;