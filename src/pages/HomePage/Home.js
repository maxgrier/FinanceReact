import React, { Component } from 'react';
import NewsAV from '../../components/NewsAV/NewsAV';
import Line2 from '../../components/Charts/Line2/Line2';
import '../../App.css';


export default class Home extends Component {
    state = {
        name: 'Max Grier'
    }

    render() {
        return (
            <div className="App">

                {/* Section for line graphs */}
                {/* <div className='lineOuter'>
                    <div className='lineDiv'>
                        <Line2
                            ticker='SPY'
                        />
                    </div>
                    <div className='lineDiv'>
                        <Line2
                            ticker='QQQ'
                        />
                    </div>
                </div> */}

                {/* Section for news */}
                <div>
                    <h1>
                        Current News
                    </h1>
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