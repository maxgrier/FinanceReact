import React, { Component } from "react";
import Plot from "react-plotly.js";
import classes from "./Line.module.css";
// import './LineTest.css'
// import { fabClasses } from '@mui/material';
// import { AVKey1, AVKey11, AVKey13 } from '../../../constants/Constants';

// var http = require("http");
// import yahooFinance from "yahoo-finance";
// var yahooFinance = require("yahoo-finance");

// const getYahoo = async () => {
//     await yahooFinance.historical(
//         {
//             symbol: "MSFT",
//             from: "2021-04-26",
//             to: "2021-04-27"
//         },
//         function (err, quotes) {
//             console.log('yahoo data: ')
//             console.log(JSON.stringify(quotes[0]))
//             // res.write(JSON.stringify(quotes[0])); //write a response to the client
//             // res.end(); //end the response
//         },
//         // JSON.stringify(quotes[0])
//     );
// }
// function async(req, res) {
//     yahooFinance.historical(
//         {
//             symbol: "MSFT",
//             from: "2021-04-26",
//             to: "2021-04-27"
//         },
//         function (err, quotes) {
//             res.write(JSON.stringify(quotes[0])); //write a response to the client
//             res.end(); //end the response
//         }
//     );
// })

// //create a server object:
// http
//   .createServer(function async(req, res) {
//     yahooFinance.historical(
//       {
//         symbol: "MSFT",
//         from: "2021-04-26",
//         to: "2021-04-27"
//       },
//       function (err, quotes) {
//         console.log('yahoo data: ')
//         console.log(JSON.stringify(quotes[0]))
//         res.write(JSON.stringify(quotes[0])); //write a response to the client
//         res.end(); //end the response
//       }
//     );
//   })
//   .listen(8080); //the server object listens on port 8080

let selectorOptions = {
  buttons: [
    {
      step: "month",
      stepmode: "backward",
      count: 1,
      label: "1m",
    },
    {
      step: "month",
      stepmode: "backward",
      count: 6,
      label: "6m",
    },
    {
      step: "year",
      stepmode: "todate",
      count: 1,
      label: "YTD",
    },
    {
      step: "year",
      stepmode: "backward",
      count: 1,
      label: "1y",
    },
    {
      step: "year",
      stepmode: "backward",
      count: 5,
      label: "5y",
    },
    {
      step: "all",
    },
  ],
};

export default class Line2 extends Component {
  state = {
    data: {},
    trace: {
      x: [],
      y: [],
      fill: "tonexty",
      type: "scatter",
      mode: "line",
    },
    minDate: "",
    maxDate: "",
    layout: {
      title: this.props.ticker.toUpperCase() + " Monthly",
      xaxis: {
        rangeselector: selectorOptions,
        rangeslider: { autorange: true },
        range: ["2010", "2015"],
      },
      yaxis: {
        fixedrange: true,
      },
      autosize: true,
      // width: 550,
      // height: 400,
    //   width: 1,
      // height: 1,
      margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 100,
          pad: 4
      },
    //   margin: {
    //     l: 0,
    //     r: 0,
    //     b: 0,
    //     t: 0,
    //     pad: 0,
    //   },
      // paper_bgcolor: '#7f7f7f',
      // plot_bgcolor: '#c7c7c7',
      paper_bgcolor: "whitesmoke",
      plot_bgcolor: "lightgrey",
      modebar: {
          width: 50
      }
    },
  };

  setUrl(ticker) {
    let apikey = "WBATMAN2RUKLWIUS";
    let url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=";
    url += ticker;
    url += "&apikey=";
    url += apikey;
    return url;
  }

  setUrl2(ticker, apiKey) {
    let apikey = apiKey;
    console.log("set 2 apik: ", apiKey);
    let url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=";
    url += ticker;
    url += "&apikey=";
    url += apikey;
    console.log("url: ", url);

    return url;
  }
  // url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+this.props.ticker+'&apikey='
  // apikey = 'WBATMAN2RUKLWIUS'
  // url = url + this.apikey

  // Call Alpha Vantage API to get stock data
  getData = async () => {
    console.log();
    try {
      let data = await fetch(this.url, { method: "GET" });
      let data2 = await data.json();
      this.setState({ data: data2 });
      return data2;
    } catch (error) {
      console.log(error);
    }
  };

  // Call Alpha Vantage API to get stock data
  getData2 = async (url) => {
    try {
      let data = await fetch(url, { method: "GET" });
      let data2 = await data.json();
      this.setState({ data: data2 });
      console.log("data 2");
      console.log(data2);
      console.log(data2["Note"].length);
      return data2;
      if (data2["Note"].length > 1) {
        return 1;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Pull out the dates and closing prices from data
  splitData = () => {
    let tempX = [];
    let tempY = [];

    for (let date in this.state.data["Monthly Time Series"]) {
      // Add date filter here?
      tempX.push(date);
      tempY.push(
        parseFloat(this.state.data["Monthly Time Series"][date]["4. close"])
      );
    }
    let minDate = Object.keys(this.state.data["Monthly Time Series"]).at(-1);
    let maxDate = Object.keys(this.state.data["Monthly Time Series"]).at(0);

    this.setState({
      trace: { ...this.state.trace, x: tempX, y: tempY },
      minDate: minDate,
      maxDate: maxDate,
      layout: {
        ...this.state.layout,
        xaxis: { ...this.state.layout["xaxis"], range: [minDate, maxDate] },
      },
    });

    console.log(minDate, maxDate);
    setTimeout(() => {
      console.log("trace");
      console.log(this.state.trace);
    }, 2000);
  };

  // FOR NEW SERVER.JS
  getDataNew = async (url) => {
    // send the dates from here
    try {
      let data = await fetch("/yahoo", {
        method: "POST",
        body: JSON.stringify({
          ticker: url,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // method: "POST",
        // body: JSON.stringify({
        //     ticker: 'VOO',
        //     title: "Fix my bugs",
        //     completed: false
        // }),
        // headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        // }
      });
      let data2 = await data.json();
      this.setState({ data: data2 });
      console.log("data new ", data2);
      console.log(data2);
      // console.log(data2['Note'].length)
      this.splitDataNew(data2);
      return data2;
      if (data2["Note"].length > 1) {
        return 1;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  splitDataNew = (data) => {
    let minDate = data.at(0).date;
    let maxDate = data.at(-1).date;
    let tempX = [];
    let tempY = [];

    data.forEach((item) => {
      tempX.push(item.date);
      tempY.push(item.close);
    });
    // for (let item in data) {
    //     // Add date filter here?
    //     console.log('item ', item)
    //     tempX.push(item.date.subString(0,11))
    //     tempY.push(item.close)
    //     // tempY.push(parseFloat(this.state.data["Monthly Time Series"][date]["4. close"]))
    // }
    console.log("split new: ");
    console.log(tempX);
    console.log(tempY);
    // let minDate = "2000-01-01"
    // let maxDate = "2023-12-31"
    // let minDate = Object.keys(this.state.data["date"]).at(-1)
    // let maxDate = Object.keys(this.state.data["date"]).at(0)
    // console.log('min, max date: ', minDate, ' ', maxDate)

    this.setState({
      trace: { ...this.state.trace, x: tempX, y: tempY },
      minDate: minDate,
      maxDate: maxDate,
      layout: {
        ...this.state.layout,
        xaxis: { ...this.state.layout["xaxis"], range: [minDate, maxDate] },
      },
    });

    // console.log(minDate, maxDate)
    // setTimeout(() => {
    //     console.log('trace')
    //     console.log(this.state.trace)
    // }, 2000);
  };

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
    // getYahoo()
    // this.url = this.setUrl(this.props.ticker)
    // this.getData()
    // this.getDataNew('VOO')
    this.getDataNew(this.props.ticker);
    // setTimeout(() => {
    //     this.splitData()
    // }, 1000);

    // setTimeout(() => {
    //     try {
    //         // this.splitData()
    //         this.splitDataNew()
    //     } catch(e) {
    //         alert(e)
    //         // setTimeout(() => {

    //         //     console.log('split data failed')
    //         //     let url3 = this.setUrl2(this.props.ticker, AVKey1)
    //         //     this.getData2(url3)
    //         //     setTimeout(() => {
    //         //         this.splitData()
    //         //     }, 500);
    //         // }, 1000);
    //     }
    // }, 500);
  }

  render() {
    return (
      <div className={classes.plotOuter}>
        <Plot data={[this.state.trace]} layout={this.state.layout} />
      </div>
    );
  }
}
