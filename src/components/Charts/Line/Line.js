import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import './Line.css';
import GetAPI from '../../../functions/Functions';
import { ApiClient, DefaultApi } from 'finnhub';

const api_key = ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cfnept1r01qokr93dsr0cfnept1r01qokr93dsrg" // Replace this
const finnhubClient = new DefaultApi()


export default class Line extends Component {
    state = {
        data: {},
        x: [],
        y: [],
        trace: {x: [1, 2, 3, 4],
            y: [12, 9, 15, 12],
            type: 'scatter',
            mode: 'lines+markers'},
    }


    trace1 = {
        x: [this.state.x],
        y: [this.state.y],
        mode: 'lines+markers'
    }

    trace3 = {
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        type: 'scatter',
        mode: 'lines+markers'
    };

    layout = {
        title: 'Adding Names to Line and Scatter Plot',
        xaxis: {dtick: 1}
    };

    getSplitData = async () => {

        let d = await this.getData()
        this.setState({data: d})
        setTimeout(() => {
            
            this.splitData()
        }, 1000);

    }

    getData = async () => {
        // let APIdata = await GetAPI();
        // setTimeout(() => {
            
        //     console.log('api data')
        //     console.log(APIdata)
        //     this.setState({ data: APIdata })
        // }, 2000);
        let data2 = {}
        finnhubClient.stockCandles("AAPL", "W", 1672563600, 1676637404, (error, data, response) => {
            console.log(data)
            console.log('data2')
            data2 = data
            console.log(data2)
            this.setState({ data: data2 })
            // setTimeout(() => {
            //     this.setState({ data: data2 })
            //     console.log('state data', this.state.data)
            // }, 2000);
            
            // data2['t'].forEach(element => {
            //     console.log(element)
            // });
        });
        this.setState({ data: data2 })
        setTimeout(() => {
            
            console.log('state data', this.state.data)
            
        }, 1000);
        setTimeout(() => {
            this.splitData()
        }, 200);
        // return data2
        // let trace = {
        //     x: [this.state.x],
        //     y: [this.state.y],
        //     mode: 'lines+markers'
        // }
        // this.setState({trace: trace})
    }

    splitData = () => {
        let tempX = []
        let tempY = []
        console.log('splitting data')
        console.log(this.state.data['t'])
        this.state.data['t'].forEach((el) => {
            tempX.push(el)
            console.log(el)
        })
        this.state.data['c'].foreach((el) => {
            tempY.push(el)
            console.log(el)
        })
        this.setState({ x: tempX, y: tempY })
        let trace = {
            x: tempX,
            y: tempY,
            mode: 'lines+markers'
        }
        this.setState({trace: 
            {x: [1, 2, 3, 4],
            y: [15, 9, 15, 12],
            type: 'scatter',
            mode: 'lines+markers'}})

    }

    componentDidMount() {
        this.getData()
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        setTimeout(() => {
            this.setState({trace: 
                {x: [...this.state.data['t']],
                y: [... this.state.data['c']],
                type: 'scatter',
                mode: 'lines+markers'}})
            }, 1500);
        // setTimeout(()=>{
        //     this.splitData()
        // },1500)
        // this.getData()
        // this.splitData()
    }

    render() {
        return (
            <div>
                <Plot
                    data={[this.state.trace]}
                    layout={this.layout}
                />
            </div>
        )
    }

}