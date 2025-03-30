import React, { Component } from "react";
// import NewsAV from '../../components/NewsAV/NewsAV';
import Line2 from "../../components/Charts/Line2/Line2";
// import Line from '../../components/Charts/Line/Line';
// import classes from "../../App.module.css";
import classes from "./Home.module.css";
import MarketNews from "../../components/News/MarketNews";
// import { MarketNews } from 'finnhub';

export default class Home extends Component {
  state = {
    name: "Max Grier",
  };

  getYahoo = async () => {
    try {
      const data = await fetch("./yahoo");
      const dataJson = await data.json();
      console.log("yahoo data: ", dataJson);
    } catch (e) {
      console.log(e);
    }
  };

  setMarketNews = (count) => {
    let h;
    for (let i = 0; i < count; i++) {
      console.log("i ", i);
      h += <h1>{i}</h1>;
      // return (

      //     <div className='newsItem'>
      //         {h}
      //         <MarketNews index={i} />
      //     </div>
      // )
    }
    return <div>{h}</div>;
  };

  componentDidMount() {
    // this.getYahoo();
  }

  render() {
    return (
      <div className={classes.homeOuter}>
        {/* Section for line graphs */}
        <div className={classes.chartContainer}>
          <Line2 ticker="SPY" />
          <Line2 ticker="QQQ" />
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
        <div className={classes.newsOuter}>
          {/* {this.setMarketNews(3)} */}
          <div className={classes.newsItem}>
            <MarketNews type="company" company="MSFT" index={3} />
          </div>
          <div className={classes.newsItem}>
            <MarketNews type="company" company="TSLA" index={3} />
          </div>
          <div className={classes.newsItem}>
            <MarketNews type="company" company="AAPL" index={3} />
          </div>
        </div>
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
