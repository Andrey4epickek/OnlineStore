import React, { Component } from 'react';
import ProductService from '../../js/services/ProductService';
import ReviewService from '../../js/services/ReviewService';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {},
            reviews: [],
            subReviews: [],
            averageScore: '',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.addReview = this.addReview.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.addSubReview = this.addSubReview.bind(this);
        this.deleteSubReview = this.deleteSubReview.bind(this);
    }

    addReview(id) {
        this.props.history.push(`/add-review/${id}`);
    }

    componentDidMount() {
        ProductService.getProductById(this.state.id).then(res => {
            this.setState({product: res.data});
            this.setState({reviews: res.data.reviewDtos});
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
        ReviewService.getAverageScore(this.state.id).then(res => {
            this.setState({averageScore: res.data});
        })
    }

    addSubReview(productId, reviewId){
        this.props.history.push(`/add-subReview/${productId}/${reviewId}`);
    }

    deleteSubReview(id){
        ReviewService.deleteSubReview(id).then( res => {
            window.location.reload();
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

    deleteComment(id){
        ReviewService.deleteReview(id).then( res => {
            window.location.reload();
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
                        <div className="row">
                            <label> Product Average Score: </label>
                            <div> {this.state.averageScore} </div>
                        </div>
                    </div>
                </div>
                <h4 className="text-center">Reviews</h4>
                        <button style={{marginBottom: "10px"}}
                             onClick={() => this.addReview(this.state.product.id)}
                                className="btn btn-primary">Add review
                        </button>
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> Review Author</th>
                                        <th> Review text</th>
                                        <th> Review score</th>
                                        <th> SubReviews</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.reviews.map(
                                            review =>
                                                <tr key={review.id}>
                                                    <td> {review.createdBy} </td>
                                                    <td> {review.description} </td>
                                                    <td> {review.score} </td>
                                                    <td> 
                                                        <button style={{marginBottom: "10px"}}
                                                                onClick={() => this.addSubReview(this.state.product.id, review.id)}
                                                                className="btn btn-primary">Add subReview
                                                        </button>
                                                        <table>
                                                            <thead>
                                                                    <tr>
                                                                        <th> Review Author</th>
                                                                        <th> Review text</th>
                                                                        <th> Actions</th>
                                                                    </tr>
                                                            </thead>

                                                            <tbody>
                                                                {
                                                                    review.subReviewDtos.map(
                                                                        subReview =>
                                                                            <tr key={subReview.id}>
                                                                                <td> {subReview.createdBy} </td>
                                                                                <td> {subReview.description} </td>
                                                                                <td>
                                                                                    <button style={{marginLeft: "10px"}}
                                                                                            onClick={() => this.deleteSubReview(subReview.id)}
                                                                                            className="btn btn-danger">Delete
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                    )   
                                                                } 
                                                            </tbody> 
                                                        </table> 
                                                    </td>
                                                    <td>
                                                        <button style={{marginLeft: "10px"}}
                                                                onClick={() => this.deleteComment(review.id)}
                                                                className="btn btn-danger">Delete
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
            </div>
        );
    }
}

export default ViewProductComponent;