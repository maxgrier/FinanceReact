import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './Line.css';
// import GetAPI from '../../../functions/Functions';
import { FinnHubKey1 } from '../../../constants/Constants';
import { ApiClient, DefaultApi } from 'finnhub';

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
        // let data2 = {}
        let today = Math.floor(Date.now() / 1000)
        //1676637404
        // console.log('today: ', today)
        finnhubClient.stockCandles(ticker, "W", 0, today, (error, data, response) => {
            // console.log(data)
            // console.log('data2')
            // data2 = data
            // console.log(data2)
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

    componentDidMount() {
        this.getData(this.props.ticker)
    }


    // NEED TO 
    //      PULL PUT IN MAX DATES FOR LAYOUT
    //      PULL WIDER REANGE OF DATA
    //      FIX TITLE AND FORMATTING
    render() {
        return (
            <div>
                <Plot
                    data={[this.state.trace]}
                    layout={this.state.layout}
                />
            </div>
        )
    }

}