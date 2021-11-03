import React, { Component } from 'react';
import CartService from '../../js/services/CartService';
import ProductService from '../../js/services/ProductService';

class ListProductsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
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
        this.addCart = this.addCart.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.viewProduct = this.viewProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
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
        ProductService.getProducts(page,size,sortBy,direction).then((res) => {
            this.setState({products: res.data});
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
        ProductService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
    }
    }

    addProduct() {
        this.props.history.push('/add-product');
    }

    pageNext() {
        let page = this.state.page;
        let size = this.state.size;
        let sortBy = this.state.sortBy;
        let direction = this.state.direction;
        ProductService.getProducts(page+1,size,sortBy,direction).then((res) => {
                this.setState({products: res.data});
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
        ProductService.getProducts(page-1,size,sortBy,direction).then((res) => {
                this.setState({products: res.data});
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
        ProductService.getProducts(0,size,sortBy,direction).then((res) => {
                this.setState({products: res.data});
                this.setState({currentPage: 1});
                this.setState({errorId:'' });
                this.setState({errorCode:'' });
                this.setState({errorMessage:'' });
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
        ProductService.count().then((res)=>{
            this.setState({total: Math.ceil(res.data/size)});
        });
    }

    viewProduct(id){
        this.props.history.push(`/view-product/${id}`);
    }

    editProduct(id){
        this.props.history.push(`/update-product/${id}`);
    }

    addToCart(id){
        CartService.addToCart(id).then(res => {
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

    deleteProduct(id){
        ProductService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.id !==id)});
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

    addCart = (e) => {
        e.preventDefault();

        CartService.createCart().then(res => {
            this.props.history.push('/products');
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
          })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Products List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addProduct}>Add Product</button>
                    <button className="btn btn-primary" onClick={this.addCart} style={{marginLeft: "10px"}}>Create Cart</button>
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
                                            <button onClick={() => this.editProduct(product.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteProduct(product.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewProduct(product.id)}
                                                    className="btn btn-info">View
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.addToCart(product.id)}
                                                    className="btn btn-primary">Add to Cart
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

export default ListProductsComponent;