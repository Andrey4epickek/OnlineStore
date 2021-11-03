import axios from 'axios'

const AUTH_API_BASE_URL = "http://localhost:8080/online-store/login";


class AuthService {

    login(request) {
        return axios.post(AUTH_API_BASE_URL, request);
    }

    logout(){
      localStorage.setItem("app_token",'login');
    }

}

export default new AuthService()