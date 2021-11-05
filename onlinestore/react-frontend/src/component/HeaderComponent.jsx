import React, {Component} from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div style={{marginLeft: "50px"}}>
                            <a href="http://localhost:3000" className="navbar-brand">Main page</a>
                            <a href="http://localhost:3000/users" className="navbar-brand">Users</a>
                            <a href="http://localhost:3000/products" className="navbar-brand">Products</a>
                            <a href="http://localhost:3000/view-cart" className="navbar-brand">Cart</a>
                            <a href="http://localhost:3000/orders" className="navbar-brand">Orders</a>
                        </div>
                        <div style={{marginLeft: "auto",marginRight:"50px"}}>
                        <a href="http://localhost:3000/login" className="navbar-brand">Login</a>
                        <a href="http://localhost:3000/register" className="navbar-brand">Register</a>
                        <a href="http://localhost:3000/logout" className="navbar-brand">Logout</a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;