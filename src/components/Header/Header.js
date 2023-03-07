import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';


export default class Header extends Component {
    state = {
        name: 'Max Grier'
    }

    render() {
        return (
            <div className="headerOuter">
                <div >
                    React Finance
                </div>

                <div className='bottomDiv'>
                    <div className='link'>
                        <NavLink to={"/FinanceReact"}>
                            Home
                        </NavLink>
                    </div>
                    <div className='link'>
                        <NavLink to={"/FinanceReact/ticker"}>
                            Ticker Search
                        </NavLink>
                    </div>
                    <div className='link'>
                        <NavLink to={"/FinanceReact/news"}>
                            News
                        </NavLink>
                    </div>
                    {/* <div className='rightDiv'>
                        Hello, {this.state.name}
                    </div> */}
                </div>

            </div>
        )
    }


}