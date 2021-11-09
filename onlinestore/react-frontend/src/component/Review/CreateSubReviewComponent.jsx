import React, { Component } from 'react';
import ReviewService from '../../js/services/ReviewService';

class CreateSubReviewComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: this.props.match.params.productId,
            idReview: this.props.match.params.reviewId,
            description: '',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveSubReview = this.saveSubReview.bind(this);
    }

    saveSubReview = (e) => {
        e.preventDefault();
        let subReview = {
            description: this.state.description
        };
        console.log('subReview => ' + JSON.stringify(subReview));

        ReviewService.createSubReview(this.state.idReview, subReview).then(res => {
            this.props.history.push(`/view-product/${this.state.idProduct}`);
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

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    cancel() {
        this.props.history.push(`/view-product/${this.state.idProduct}`);
    }

    render() {
        return (
            <div>
                <div className="container" style={{marginTop: "10px"}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> Add subReview</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Description: </label>
                                        <input type="text" placeholder="Description" name="Description" className="form-control"
                                               value={this.state.description} onChange={this.changeDescriptionHandler} required pattern="[a-zA-Z]{1,100}"/>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveSubReview}>Save</button>
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

export default CreateSubReviewComponent;