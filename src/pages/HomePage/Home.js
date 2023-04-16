import React, { Component } from 'react';
import NewsAV from '../../components/NewsAV/NewsAV';
import Line2 from '../../components/Charts/Line2/Line2';
import Line from '../../components/Charts/Line/Line';
import '../../App.css';
import MarketNews from '../../components/News/MarketNews';
// import { MarketNews } from 'finnhub';



export default class Home extends Component {
    state = {
        name: 'Max Grier'
    }

    setMarketNews = (count) => {
        let h 
        for (let i = 0; i < count; i++) {
            console.log('i ', i)
            h += <h1>{i}</h1>
            // return (
                
            //     <div className='newsItem'>
            //         {h}
            //         <MarketNews index={i} />
            //     </div>
            // )
        }
        return <div>{h}</div>
    }

    render() {
        return (
            <div className="App">

                {/* Section for line graphs */}
                <div className='lineOuter'>
                    <div className='lineDiv'>
                        <Line
                            ticker='SPY'
                        />
                    </div>
                    <div className='lineDiv'>
                        <Line
                            ticker='QQQ'
                        />
                    </div>
                </div>

                {/* Section for news */}
                <div>
                    <h1>
                        Market News
                    </h1>
                </div>
                <div className='newsOuter'>
                    {/* {this.setMarketNews(3)} */}
                    <div className='newsItem'>
                        <MarketNews type="general" index={0} />
                    </div>
                    <div className='newsItem'>
                        <MarketNews type="general" index={1} />
                    </div>
                    <div className='newsItem'>
                        <MarketNews type="general" index={2} />
                    </div>
                </div>
                <div>
                    <h1>
                        Company News
                    </h1>
                </div>
                <div className='newsOuter'>
                    {/* {this.setMarketNews(3)} */}
                    <div className='newsItem'>
                        <MarketNews type="company" company="MSFT" index={3} />
                    </div>
                    <div className='newsItem'>
                        <MarketNews type="company" company="TSLA" index={3} />
                    </div>
                    <div className='newsItem'>
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
                <div className='footer'>
                
                </div>

            </div>
        );
    }
}