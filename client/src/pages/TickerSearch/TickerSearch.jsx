import React, { Component } from "react";
import Line2 from "../../components/Charts/Line2/Line2";
import classes from "./TickerSearch.css";

// import logo from '../../../public/logo512.png'
// import logo from '../../Photos/logo512.png'
// import photos from '../../Photos/'

// for(var i = 0; i < 2; i++){
//     var name = 'logo'+i
//     import name from '../../Photos/logo512.png'
// }

export default class Photos extends Component {
  state = {
    key: 0,
    ticker: "AAPL",
    companyName: "Apple Inc.",
    data: [],
    dataLoaded: false,
  };

  getQuote = async (e, ticker) => {
    if (e) {
      e.preventDefault();
    }
    try {
      let data = await fetch(
        "/api/getQuote",
        // let data = await fetch('/api/getNews',
        {
          method: "POST",
          body: JSON.stringify({
            ticker: ticker,
          }),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      let data2 = await data.json();
      this.setState({ data: data2 }, () => {
        this.setState({ key: this.state.key + 1, dataLoaded: true });
      });
      return data2;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  componentDidMount() {
    this.getQuote(false, this.state.ticker);
  }

  render() {
    return (
      <>
        {this.state.dataLoaded ? (
          <div>
            <br />
            <div className={classes.searchouter}>
              <form onSubmit={(e) => this.getQuote(e, this.state.ticker)}>
                <input
                  placeholder={this.state.ticker}
                  onChange={(e) => this.setState({ ticker: e.target.value })}
                ></input>
                <button> Search </button>
              </form>
            </div>
            <div className={classes.companyNameOuter}>
              <div>
                <h5>
                  {this.state.data.fullExchangeName} -{" "}
                  {this.state.data.quoteSourceName} - {this.state.data.typeDisp}
                </h5>
                <h1>{this.state.data.longName}</h1>
              </div>
            </div>

            <div className={classes.prices}>
              <div>
                Current Price
                <span> {this.state.data.regularMarketPrice} </span>
              </div>
              <div>
                Post Market Price
                <span> {this.state.data.postMarketPrice} </span>
              </div>
              <div>
                Previous Price
                <span> {this.state.data.regularMarketPreviousClose} </span>
              </div>
              <div>
                Percent Change
                <span>
                  {" "}
                  {Math.round(
                    this.state.data.regularMarketChangePercent * 100
                  ) / 100}{" "}
                  {"%"}{" "}
                </span>
              </div>
            </div>

            <div>
              Analyst Opinion (change color to green, yellow, red)
              <span>
                {this.state.data.averageAnalystRating}
                {this.state.data.averageAnalystRating.includes("Buy")
                  ? "Green"
                  : "Red"}
              </span>
            </div>
            <div>
              Charts
              <Line2 ticker={this.state.ticker} key={this.state.key} />
            </div>
            <div>News </div>
          </div>
        ) : (
          <>Data Loading</>
        )}
      </>
    );
  }
}
