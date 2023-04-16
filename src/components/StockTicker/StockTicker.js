import React, { Component } from "react";
import { FinnHubKey1 } from "../../constants/Constants";
import "./StockTicker.css";
import { ApiClient, DefaultApi } from 'finnhub';
// import { AVKey4, AVKey5 } from "../../constants/Constants";


// Constants needed for the Finnhub API call
const api_key = ApiClient.instance.authentications['api_key']
api_key.apiKey = FinnHubKey1
const finnhubClient = new DefaultApi()


export default class StockTicker extends Component {
    state = {
        // baseUrl: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=",
        // apiKey: AVKey5,
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

    // Function to pull the stock data from Finnhub.io API
    getFinData = async (ticker) => {
        let tempTickers = []

        // Get the FinnHub quote for each ticker
        this.state.tickers.forEach((item) => {
            let ticker = item.ticker

            finnhubClient.quote(ticker, (error, data, response) => {
                tempTickers.push({ ticker: ticker, currPrice: data.c, priorPrice: data.pc })
            });
        })
        setTimeout(() => {
            this.setState({ tickers: tempTickers, loaded: true })
        }, 500);

    }



    // // Call ticker API to get current and prior day data
    // getAPIData = async (ticker, apiKey) => {
    //     try {
    //         let url = this.state.baseUrl + ticker + "&apikey=" + apiKey
    //         let data = await fetch(url, { method: 'GET' })
    //         let data2 = await data.json()
    //         // console.log(data2)
    //         // console.log(data2[0])
    //         console.log(data2["Global Quote"])

    //         // this.setNewsItems()
    //         return data2["Global Quote"]
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // // Call APi to get realtime data for each stock
    // getTickerData = async () => {
    //     console.log('getting')
    //     let apiKey = AVKey4
    //     let count = 0
    //     let tempTickers = []

    //     // Get each ticker
    //     this.state.tickers.forEach(async (item) => {
    //         if (count >= 5) {
    //             apiKey = AVKey5
    //         }
    //         // Call API for each ticker
    //         let stockData = await this.getAPIData(item.ticker, apiKey)

    //         // Pulling values out since stockData['05. price'] doesn't work?
    //         let values = Object.values(stockData)

    //         let tempData = { ticker: item.ticker, currPrice: values[4], priorPrice: values[7] }
    //         tempTickers.push(tempData)

    //         count += 1
    //         console.log('temp data ', tempData)
    //     })
    //     console.log('temp tickers ', tempTickers)
    //     this.setState({ tickers: tempTickers })
    //     setTimeout(() => {
    //         this.setState({ loaded: true })
    //     }, 500);
    // }

    // Create ticker item for each ticker symbol
    setTickerData = () => {
        console.log('setting ticker data')
        console.log(this.state.tickers)
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


    componentDidMount() {
        // this.getTickerData()
        this.getFinData()
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
                        </div>
                    </div>
                }

            </>
        )
    }
}