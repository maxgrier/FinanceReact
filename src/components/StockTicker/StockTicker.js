import React, { Component } from "react";
import { AVKey4, AVKey5 } from "../../constants/Constants";
import "./StockTicker.css"

const tickers = [
    { ticker: "AAPL", value: 199 },
    { ticker: "TSLA", value: 500 },
    { ticker: "BA", value: 200 },
]

export default class StockTicker extends Component {
    state = {
        baseUrl: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=",
        apiKey: AVKey5,
        loaded: false,
        tickers: [
            { ticker: "SPY", currPrice: 199, priorPrice: 300 },
            { ticker: "QQQ", currPrice: 300, priorPrice: 300 },
            { ticker: "AAPL", currPrice: 350, priorPrice: 300 },
            { ticker: "TSLA", currPrice: 333, priorPrice: 300 },
            { ticker: "MSFT", currPrice: 199, priorPrice: 300 },
            { ticker: "F", currPrice: 199, priorPrice: 300 },
            { ticker: "ZG", currPrice: 199, priorPrice: 300 },
            { ticker: "AMZN", currPrice: 199, priorPrice: 300 },
            { ticker: "GOOG", currPrice: 199, priorPrice: 300 },
            { ticker: "BA", currPrice: 199, priorPrice: 300 },
        ],
    }

    // Call ticker API to get current and prior day data
    getAPIData = async (ticker, apiKey) => {
        try {
            let url = this.state.baseUrl + ticker + "&apikey=" + apiKey
            let data = await fetch(url, { method: 'GET' })
            let data2 = await data.json()
            // console.log(data2)
            // console.log(data2[0])
            console.log(data2["Global Quote"])

            // this.setNewsItems()
            return data2["Global Quote"]
        } catch (error) {
            console.log(error)
        }
    }

    // Call APi to get realtime data for each stock
    getTickerData = async () => {
        console.log('getting')
        let apiKey = AVKey4
        let count = 0
        let tempTickers = []

        // Get each ticker
        this.state.tickers.forEach(async (item) => {
            if (count >= 5) {
                apiKey = AVKey5
            }
            // Call API for each ticker
            let stockData = await this.getAPIData(item.ticker, apiKey)

            // Pulling values out since stockData['05. price'] doesn't work?
            let values = Object.values(stockData)

            let tempData = { ticker: item.ticker, currPrice: values[4], priorPrice: values[7] }
            tempTickers.push(tempData)

            count += 1
            console.log('temp data ', tempData)
        })
        console.log('temp tickers ', tempTickers)
        this.setState({ tickers: tempTickers })
        setTimeout(() => {
            this.setState({loaded: true})
        }, 500);
    }

    // Create ticker item for each ticker symbol
    setTickerData = () => {
        console.log('setting ticker data')
        return (
            this.state.tickers.map((item) => {
                // Set class based on price going up or down
                let classStyle = ""
                if (item.currPrice > item.priorPrice) {
                    classStyle = "ticker-item-up"
                } else {
                    classStyle = "ticker-item-down"
                }

                // Get rounded percentage change
                let percent = ((item.currPrice - item.priorPrice) / item.priorPrice) * 100
                percent = Math.round(percent * 100) / 100

                let roundedPrice = Math.round(item.currPrice * 100) / 100

                return (
                    <div className={classStyle} key={item.ticker}>{item.ticker + ' | $' + roundedPrice + ' (' + percent + '%)'}</div>
                )
            }))
    }

    // getAndSet = async () => {
    //     console.log('getting and setting ')
    //     await this.getTickerData()
    //     this.setTickerData()
    // }

    componentDidMount() {
        this.getTickerData()
    }

    render() {
        return (
            <>
                {/* Ticker code form https://codepen.io/lewismcarey/pen/GJZVoG */}
                {!this.state.loaded
                    ?
                    <div>Loading</div>
                    :
                    
                    <div className="ticker-wrap" >
                    <div className="ticker">
                        {this.setTickerData()}
                        {/* {this.setTickerData()} */}
                        {/* <div className="ticker-item">Letterpress chambray brunch.</div>
                    <div className="ticker-item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
                    <div className="ticker-item">Ugh PBR&B kale chips Echo Park.</div>
                    <div className="ticker-item">Gluten-free mumblecore chambray mixtape food truck. </div> */}
                    </div>
                </div>
                }
                
            </>
        )
    }
}