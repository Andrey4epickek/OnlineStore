import axios from 'axios'

const PRODUCTS_API_BASE_URL = "http://localhost:8080/online-store/reviews";

class ReviewService {

    createReview(productId, review) {
        return axios.post(PRODUCTS_API_BASE_URL+'/'+productId, review);
    }

    getAverageScore(productId) {
        return axios.get(PRODUCTS_API_BASE_URL + '/averageScore/' + productId);
    }

    deleteReview(reviewId) {
        return axios.put(PRODUCTS_API_BASE_URL + '/' + reviewId);
    }

    deleteSubReview(subReviewId) {
        return axios.put(PRODUCTS_API_BASE_URL + '/subreviews/' + subReviewId);
    }

    createSubReview(reviewId, subReview) {
        return axios.post(PRODUCTS_API_BASE_URL+'/subreviews/'+reviewId, subReview);
    }
}

export default new ReviewService()