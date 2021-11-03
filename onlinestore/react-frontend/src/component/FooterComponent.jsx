import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <footer className="text-muted py-5">
                    <div className="container" style={{textAlign: 'center',color:'black'}}>
                        <span>All Rights Reserved 2021</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;