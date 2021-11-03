import axios from 'axios'


const PRODUCTS_API_BASE_URL = "http://localhost:8080/online-store/carts";

class CartService {

    count(){
        return axios.get(PRODUCTS_API_BASE_URL+'/total');
    }

    createCart() {
        return axios.post(PRODUCTS_API_BASE_URL);
    }

    getCartById(cartId) {
        return axios.get(PRODUCTS_API_BASE_URL + '/' + cartId);
    }

    getTotalPrice() {
        return axios.get(PRODUCTS_API_BASE_URL + '/total/'+1);
    }

    addToCart(productId){
        return axios.put(PRODUCTS_API_BASE_URL + '/1/'+productId);
    }

    deleteFromCart(productId){
        return axios.put(PRODUCTS_API_BASE_URL + '/product-removal/1/'+productId);
    }

    clearCart(cartId) {
        return axios.put(PRODUCTS_API_BASE_URL + '/emptyCart/' + cartId);
    }
}

export default new CartService()