import axios from 'axios'

const PRODUCTS_API_BASE_URL = "http://localhost:8080/online-store/orders";

class OrderService {

    createOrder(cartId) {
        return axios.post(PRODUCTS_API_BASE_URL+ '/' + cartId);
    }

    getOrders(page,size,sortBy,direction) {
        return axios.get(PRODUCTS_API_BASE_URL+'?page='+page+'&size='+size+'&sortBy='+sortBy+'&direction='+direction);
    }

    getOrdersAdmin(page,size,sortBy,direction) {
        return axios.get(PRODUCTS_API_BASE_URL+'/admin?page='+page+'&size='+size+'&sortBy='+sortBy+'&direction='+direction);
    }

    count(){
        return axios.get(PRODUCTS_API_BASE_URL+'/total');
    }

    deleteOrder(orderId) {
        return axios.delete(PRODUCTS_API_BASE_URL + '/' + orderId);
    }

    getOrderById(orderId) {
        return axios.get(PRODUCTS_API_BASE_URL + '/' + orderId);
    }

    payForOrder(orderId) {
        return axios.put(PRODUCTS_API_BASE_URL + '/payment/' + orderId);
    }
}

export default new OrderService()