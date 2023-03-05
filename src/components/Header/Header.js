import React, { Component } from 'react';
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
                        Home
                    </div>
                    <div className='link'>
                        Ticker Search
                    </div>
                    <div className='link'>
                        News
                    </div>
                    <div className='rightDiv'>
                        Hello, {this.state.name}
                    </div>
                </div>
                
            </div>
        )
    }


}