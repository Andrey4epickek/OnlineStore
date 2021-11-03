import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/online-store/users";

class UserService {
    
    getUsers(page,size,sortBy,direction) {
        return axios.get(USER_API_BASE_URL+'?page='+page+'&size='+size+'&sortBy='+sortBy+'&direction='+direction);
    }

    count(){
        return axios.get(USER_API_BASE_URL+'/total');
    }

    createUser(data) {
        return axios.post(USER_API_BASE_URL, data);
    }

    getUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(data) {
        return axios.put(USER_API_BASE_URL, data);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()