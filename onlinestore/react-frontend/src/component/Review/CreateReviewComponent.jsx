import React, { Component } from 'react';
import ReviewService from '../../js/services/ReviewService';

class CreateReviewComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: this.props.match.params.id,
            description: '',
            score: '',
            errorId: '',
            errorCode: '',
            errorMessage: ''
        }
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeScoreHandler = this.changeScoreHandler.bind(this);
        this.saveReview = this.saveReview.bind(this);
    }

    saveReview = (e) => {
        e.preventDefault();
        let review = {
            description: this.state.description,
            score: this.state.score
        };
        console.log('review => ' + JSON.stringify(review));

        ReviewService.createReview(this.state.idProduct, review).then(res => {
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

    changeScoreHandler = (event) => {
        this.setState({score: event.target.value});
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
                            <h3 className="text-center"> Add Review</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Description: </label>
                                        <input type="text" placeholder="Description" name="Description" className="form-control"
                                               value={this.state.description} onChange={this.changeDescriptionHandler} required pattern="[a-zA-Z]{1,100}"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Score: </label>
                                        <input type="number" placeholder="Score" name="Score" className="form-control"
                                               value={this.state.score} onChange={this.changeScoreHandler} required min="1" max="5"/>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorId}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorCode}</label><br/>
                                        <label style={{fontSize: "15pt",color:"red"}}>{this.state.errorMessage}</label>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveReview}>Save</button>
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

export default CreateReviewComponent;