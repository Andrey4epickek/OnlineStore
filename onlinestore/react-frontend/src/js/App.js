import '../css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUsersComponent from '../component/User/ListUsersComponent';
import ListProductsComponent from '../component/Product/ListProductsComponent';
import HeaderComponent from '../component/HeaderComponent';
import FooterComponent from '../component/FooterComponent';
import CreateUserComponent from '../component/User/CreateUserComponent';
import CreateProductComponent from '../component/Product/CreateProductComponent';
import UpdateProductComponent from '../component/Product/UpdateProductComponent';
import UpdateUserComponent from '../component/User/UpdateUserComponent';
import ViewUserComponent from '../component/User/ViewUserComponent';
import ViewProductComponent from '../component/Product/ViewProductComponent';
import LoginComponent from '../component/Login/LoginComponent';
import axios from 'axios';
import LogoutComponent from '../component/Logout/LogoutComponent';
import RegisterComponent from '../component/Register/RegisterComponent';
import ViewCartComponent from '../component/Cart/ViewCartComponent';
import ListOrdersComponent from '../component/Order/ListOrdersComponent';
import ViewOrderComponent from '../component/Order/ViewOrderComponent';

axios.defaults.headers.common["Authorization"]=localStorage.getItem("app_token");


  
function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact></Route>
                        <Route path="/users" component={ListUsersComponent}></Route>
                        <Route path="/add-user" component={CreateUserComponent}></Route>
                        <Route path="/update-user/:id" component={UpdateUserComponent}></Route>
                        <Route path="/view-user/:id" component={ViewUserComponent}></Route>
                        <Route path="/products" component={ListProductsComponent}></Route>
                        <Route path="/add-product" component={CreateProductComponent}></Route>
                        <Route path="/update-product/:id" component={UpdateProductComponent}></Route>
                        <Route path="/view-product/:id" component={ViewProductComponent}></Route>
                        <Route path="/view-cart/:id" component={ViewCartComponent}></Route>
                        <Route path="/orders" component={ListOrdersComponent}></Route>
                        <Route path="/view-order/:id" component={ViewOrderComponent}></Route>
                        <Route path="/login" component={LoginComponent}></Route>
                        <Route path="/logout" component={LogoutComponent}></Route>
                        <Route path="/register" component={RegisterComponent}></Route>
                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>
    );
}

export default App;
