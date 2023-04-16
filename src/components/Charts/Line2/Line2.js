import { fabClasses } from '@mui/material';
import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import { AVKey1, AVKey11, AVKey13 } from '../../../constants/Constants';


let selectorOptions = {
    buttons: [
        {
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        },
        {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        },
        {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        },
        {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        },
        {
            step: 'year',
            stepmode: 'backward',
            count: 5,
            label: '5y'
        },
        {
            step: 'all',
        }],
};


export default class Line2 extends Component {
    state = {
        data: {},
        trace: {
            x: [],
            y: [],
            fill: 'tonexty',
            type: 'scatter',
            mode: 'line'
        },
        minDate: "",
        maxDate: "",
        layout: {
            title: this.props.ticker + ' Monthly',
            xaxis: {
                rangeselector: selectorOptions,
                rangeslider: { autorange: true },
                range: ['2010', '2015']
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
        },
    }

    setUrl(ticker) {
        let apikey = 'WBATMAN2RUKLWIUS'
        let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='
        url += ticker
        url += '&apikey='
        url += apikey
        return url
    }

    setUrl2(ticker, apiKey) {
        let apikey = apiKey
        console.log('set 2 apik: ', apiKey)
        let url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='
        url += ticker
        url += '&apikey='
        url += apikey
        console.log('url: ', url)

        return url
    }
    // url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+this.props.ticker+'&apikey='
    // apikey = 'WBATMAN2RUKLWIUS'
    // url = url + this.apikey

    // Call Alpha Vantage API to get stock data
    getData = async () => {
        console.log()
        try {
            let data = await fetch(this.url, { method: 'GET' })
            let data2 = await data.json()
            this.setState({ data: data2 })
            return data2
        } catch (error) {
            console.log(error)
        }
    }

    // Call Alpha Vantage API to get stock data
    getData2 = async (url) => {
        try {
            let data = await fetch(url, { method: 'GET' })
            let data2 = await data.json()
            this.setState({ data: data2 })
            console.log('data 2')
            console.log(data2)
            console.log(data2['Note'].length)
            return data2
            if (data2['Note'].length > 1) {
                return 1
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Pull out the dates and closing prices from data
    splitData = () => {
        let tempX = []
        let tempY = []

        for (let date in this.state.data["Monthly Time Series"]) {
            // Add date filter here?
            tempX.push(date)
            tempY.push(parseFloat(this.state.data["Monthly Time Series"][date]["4. close"]))
        }
        let minDate = Object.keys(this.state.data["Monthly Time Series"]).at(-1)
        let maxDate = Object.keys(this.state.data["Monthly Time Series"]).at(0)

        this.setState({
            trace: { ...this.state.trace, x: tempX, y: tempY }, minDate: minDate, maxDate: maxDate,
            layout: { ...this.state.layout, xaxis: { ...this.state.layout['xaxis'], range: [minDate, maxDate] } }
        })

        console.log(minDate, maxDate)
        setTimeout(() => {
            console.log('trace')
            console.log(this.state.trace)
        }, 2000);
    }

    // layout = {
    //     title: 'SPY Monthly',
    //     autosize: false,
    //     width: 300,
    //     height: 500,
    //     margin: {
    //         l: 50,
    //         r: 50,
    //         b: 100,
    //         t: 100,
    //         pad: 4
    //     },
    //     paper_bgcolor: '#7f7f7f',
    //     plot_bgcolor: '#c7c7c7',
    //     xaxis: {
    //         rangeselector: selectorOptions,
    //         rangeslider: { autorange: true },
    //         range: [this.state.minDate, this.state.maxDate]
    //     },
    //     yaxis: {
    //         fixedrange: true
    //     },
    // };

    // url = ''
    componentDidMount() {
        // this.url = this.setUrl(this.props.ticker)
        // this.getData()
        // setTimeout(() => {
        //     this.splitData()
        // }, 1000);



        setTimeout(() => {
            try {
                this.splitData()
            } catch {
                setTimeout(() => {

                    console.log('split data failed')
                    let url3 = this.setUrl2(this.props.ticker, AVKey1)
                    this.getData2(url3)
                    setTimeout(() => {
                        this.splitData()
                    }, 1000);
                }, 5000);
            }
        }, 500);
    }

    render() {
        return (
            <Plot
                data={[this.state.trace]}
                layout={this.state.layout}
            />
        )
    }

}