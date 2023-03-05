import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';

import GetAPI from './functions/Functions';
import Line from './components/Charts/Line/Line';
import Line2 from './components/Charts/Line2/Line2';
import News from './components/News/News';


function App() {

  // GetAPI()
  return (
    <div className="App">

      {/* Section for header test  */}
      <div className='headerDiv'>
        <Header />
      </div>

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
      <div className='newsOuter'>
        <div className='newsItem'>
          <News
            company='bitcoin'
          />
        </div>
        <div className='newsItem'>
          <News
            company='apple'
          />
        </div>
        <div className='newsItem'>
          <News
            company='tesla'
          />
        </div>
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}

export default App;
