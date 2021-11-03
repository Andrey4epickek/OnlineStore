import axios from 'axios'

const PRODUCTS_API_BASE_URL = "http://localhost:8080/online-store/products";

class ProductService {

    getProducts(page,size,sortBy,direction) {
        return axios.get(PRODUCTS_API_BASE_URL+'?page='+page+'&size='+size+'&sortBy='+sortBy+'&direction='+direction);
    }

    count(){
        return axios.get(PRODUCTS_API_BASE_URL+'/total');
    }

    createProduct(product) {
        return axios.post(PRODUCTS_API_BASE_URL, product);
    }

    getProductById(productId) {
        return axios.get(PRODUCTS_API_BASE_URL + '/' + productId);
    }

    updateProduct(product) {
        return axios.put(PRODUCTS_API_BASE_URL, product);
    }

    deleteProduct(productId) {
        return axios.delete(PRODUCTS_API_BASE_URL + '/' + productId);
    }
}

export default new ProductService()