import React, { Component } from "react";
// import NewsAV from '../../components/NewsAV/NewsAV';
import Line2 from "../../components/Charts/Line2/Line2";
import LineFunc from "../../components/Charts/Line2/LineFunc";
// import Line from '../../components/Charts/Line/Line';
// import classes from "../../App.module.css";
import classes from "./Home.module.css";
import MarketNews from "../../components/News/MarketNews";
// import { MarketNews } from 'finnhub';

export default class Home extends Component {
  state = {
    name: "Max Grier",
  };

  renderMarketNews = () => {
    let companies = ["AMZN","TSLA", "AAPL","NVDA","GOOGL","MSFT"]; // List of companies
    return companies.map((company) => (
      <div key={company} className={classes.newsItem}>
        <MarketNews type="company" company={company} index={3} />
      </div>
    ));
  };

  render() {
    return (
      <div className={classes.homeOuter}>
        {/* Section for line graphs */}
        <div className={classes.chartContainer}>
          {/* <Line2 ticker="SPY" /> */}
          {/* <Line2 ticker="QQQ" /> */}
          <LineFunc ticker="SPY" />
          <LineFunc ticker="QQQ" />
        </div>
        {/* <div className={classes.lineOuter}>
          <div className={classes.lineDiv}>
            <Line2 ticker="SPY" />
            //<Line ticker="SPY" />
          </div>
          <div className={classes.lineDiv}>
            <Line2 ticker="QQQ" />
            //<Line ticker="QQQ" />
          </div>
        </div> */}

        {/* Section for news */}
        <div>
          <h1>Market News</h1>
        </div>
        <div className={classes.newsOuter}>
          {/* {this.setMarketNews(3)} */}
          {/* <div className='newsItem'>
                        <MarketNews type="general" indexList={[0,1,2,3,4,5]} />
                    </div>
                    <div className='newsItem'>
                        <MarketNews type="general" indexList={[6,7,8,9,10]} />
                    </div>
                    <div className='newsItem'>
                        <MarketNews type="general" indexList={[11,12,13,14,15]} />
                    </div> */}
        </div>
        <div>
          <h1>Company News</h1>
        </div>
        <div className={classes.newsOuter}>{this.renderMarketNews()}</div>
        {/* <div className={classes.newsOuter}>
          <div className={classes.newsItem}>
            <MarketNews type="company" company="MSFT" index={3} />
          </div>
          <div className={classes.newsItem}>
            <MarketNews type="company" company="TSLA" index={3} />
          </div>
          <div className={classes.newsItem}>
            <MarketNews type="company" company="AAPL" index={3} />
          </div>
        </div> */}
        {/* <div className='newsOuter'>
                    <div className='newsItem'>
                        <NewsAV
                            company='TSLA'
                        />
                    </div>
                    <div className='newsItem'>
                        <NewsAV
                            company='MSFT'
                        />
                    </div>
                    <div className='newsItem'>
                        <NewsAV
                            company='AAPL'
                        />
                    </div>
                </div> */}
        <div className={classes.footer}></div>
      </div>
    );
  }
}
