import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor() {
        super();
    }

    render() {
        
        return (
            <>
            <header>
            
                <nav id="headerClicker">
                    <div className="nav-wrapper">
                        <div className="row">
                            <div className="col s0">
                                <div id="panelTopLeft">
                                    <Link to="/">
                                        <div className="home_panelLogo"></div>
                                    </Link>
                                </div>
                           </div>
                            <div className="col s2 left-align valign-wrapper">
                                <div id="panelTopLeft valign-wrapper">
                                </div>
                            </div>
                            <ul className="right hide-on-med-and-down">
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            </>

        )
    }

}


export default Header;