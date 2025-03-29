import React, { Component } from 'react'
import classes from './TickerSearch.css';
// import logo from '../../../public/logo512.png'
// import logo from '../../Photos/logo512.png'
// import photos from '../../Photos/'

// for(var i = 0; i < 2; i++){
//     var name = 'logo'+i
//     import name from '../../Photos/logo512.png'
// }

export default class Photos extends Component {
    state = {
        ticker: "AAPL",
        data: [],
    }

    getQuote = async (e, ticker) => {
        if (e) {
            e.preventDefault();
        }
        try {
            let data = await fetch('/api/getQuote',
                // let data = await fetch('/api/getNews',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ticker: ticker
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            let data2 = await data.json()
            console.log('quote data: ', data2)
            this.setState({ data: data2 })
            return data2
        } catch (error) {
            console.log(error)
            return false
        }
    }

    componentDidMount() {
        this.getQuote(false, this.state.ticker)
    }


    render() {
        return (
            <>
                <div>
                    <br></br>
                    <div className={classes.searchouter} style={{color:'red'}}>
                        <form onSubmit={(e) => this.getQuote(e, this.state.ticker)}>
                            <input placeholder={this.state.ticker} onChange={(e) => this.setState({ ticker: e.target.value })}></input>
                            <button>Search</button>

                        </form>
                    </div>
                    <div className={'test'}>
                        Price stuff
                        Current Price
                        <span>{this.state.data.regularMarketPrice}</span>
                        Previous Price
                        Percent Change
                    </div>
                    <div>
                        Analyst Opinion
                    </div>
                    <div>
                        Charts
                    </div>
                    <div>
                        News
                    </div>
                    {/* <a href={logo} download={'logo'}>download logo</a>
                <br></br>
                <a href={'../../Photos/*'} download={'Photos'}>download photos</a> */}
                </div>
            </>
        )
    }
}