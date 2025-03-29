import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './Line.css';
// import GetAPI from '../../../functions/Functions';
import { FinnHubKey1 } from '../../../constants/Constants';
import { ApiClient, DefaultApi } from 'finnhub';

// Yahoo Finance API
// https://cryptocointracker.com/yahoo-finance/yahoo-finance-api
// https://stackoverflow.com/questions/76065035/yahoo-finance-v7-api-now-requiring-cookies-python

// Constants needed for the Finnhub API call
const api_key = ApiClient.instance.authentications['api_key']
api_key.apiKey = FinnHubKey1
const finnhubClient = new DefaultApi()

// Options for chart filtering
let selectorOptions = {
    buttons: [
        { step: 'month', stepmode: 'backward', count: 1, label: '1m' },
        { step: 'month', stepmode: 'backward', count: 6, label: '6m' },
        { step: 'year', stepmode: 'todate', count: 1, label: 'YTD' },
        { step: 'year', stepmode: 'backward', count: 1, label: '1y' },
        { step: 'year', stepmode: 'backward', count: 5, label: '5y' },
        { step: 'all', } ]
}


export default class Line extends Component {
    state = {
        data: {},
        x: [],
        y: [],
        trace: {
            x: [],
            y: [],
            fill: 'tonexty',
            type: 'scatter',
            mode: 'lines+markers'
        },
        layout: {
            title: ' Monthly',
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: { autorange: true },
                range: { autorange: true }
            },
            yaxis: {
                fixedrange: true
            },
            // autosize: true,
            width: 550,
            height: 400,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#7f7f7f',
            plot_bgcolor: '#c7c7c7',
        }
    }

    // Layout for the Plotly chart
    layout2 = {
        title: this.props.ticker + ' Weekly',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: { autorange: true },
            // range: ['2023-01-01', '2023-05-12']
            range: { autorange: true }
        },
        yaxis: {
            fixedrange: true
        },
        // autosize: true,
        width: 550,
        height: 400,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
        paper_bgcolor: '#7f7f7f',
        plot_bgcolor: '#c7c7c7',
    }


    // Function to pull the stock data from Finnhub.io API
    getData = async (ticker) => {

        finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, (error, data, response) => {
            console.log(data)
          });


        // let data2 = {}
        let today = Math.floor(Date.now() / 1000)
        //1676637404
        // console.log('today: ', today)
        finnhubClient.stockCandles(ticker, "W", 0, today, (error, data, response) => {
            // console.log(data)
            // console.log('data2')
            // data2 = data
            // console.log(data2)
            console.log('data')
            console.log(data)
            this.setState({ data: data }, () => { this.splitData() })

            // ADD LOADING DONE HERE

        });

        // Can probably delete
        // this.setState({ data: data2 })

        // setTimeout(() => {
        //     this.splitData()
        // }, 1500);

    }

    splitData = () => {
        let tempX = []
        let tempY = []
        console.log('data')
        console.log(this.state.data)
        // console.log('splitting data')
        // console.log(this.state.data['t'])
        // console.log(this.state.data['c'])

        // Convert UNIX timestamps to yyyy-mm-dd
        this.state.data['t'].forEach((el) => {
            let date = new Date(el * 1000)
            date = date.toISOString().split('T')[0]
            tempX.push(date)
        })

        // Pull out the close prices
        this.state.data['c'].forEach((el) => {
            tempY.push(el)
        })
        // this.setState({ x: tempX, y: tempY })

        this.setState({
            trace:
            {
                x: tempX,
                y: tempY,
                fill: 'tonexty',
                type: 'scatter',
                mode: 'line'
            }, layout: this.layout2 // will need to change this idk why I need it?
        })
    }

    getYahooData = async (ticker) => {
        try {
            let url = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/aapl?modules=earningsHistory&crumb=WU6N/XPKP5w"
            let url2 = 'https://query1.finance.yahoo.com/v8/finance/chart/aapl?metrics=high?&interval=1d&range=5d'
            let url3 = 'http://query2.finance.yahoo.com/v7/finance/quote?symbols=TSLA&crumb=WU6N/XPKP5w'
            let url4 = 'http://fc.yahoo.com'
            let data = await fetch(url4,
            {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, *cors, same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                  'Access-Control-Allow-Origin': '*'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            let dataJson = data.json();
            console.log('yahoo data')
            console.log(data)
            console.log(dataJson)
        } catch (error) {
            console.log(error)
        }
    }

    async postData(url) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
        //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        //   redirect: "follow", // manual, *follow, error
        //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //   body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
      


    componentDidMount() {
        // this.getData(this.props.ticker)
        this.getYahooData(this.props.ticker)
        // console.log('post data --------', this.postData('http://query1.finance.yahoo.com/v8/finance/chart/aapl?metrics=high?&interval=1d&range=5d'))
    }


    // NEED TO 
    //      PULL PUT IN MAX DATES FOR LAYOUT
    //      PULL WIDER REANGE OF DATA
    //      FIX TITLE AND FORMATTING
    render() {
        return (
            <div>
                {/* <Plot
                    data={[this.state.trace]}
                    layout={this.state.layout}
                /> */}
            </div>
        )
    }

}