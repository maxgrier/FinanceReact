import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';

import GetAPI from './functions/Functions';
import Line from './components/Charts/Line/Line';
import Line2 from './components/Charts/Line2/Line2';
import News from './components/News/News';
import NewsAV from './components/NewsAV/NewsAV';

import { BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { createBrowserHistory } from "history";
import Home from './pages/HomePage/Home';

const history = createBrowserHistory()

function App() {

  // GetAPI()
  return (
    <BrowserRouter history={history}>
      <>
          <div className="App">

            {/* Section for header */}
            <div className='headerDiv'>
              <Header />
            </div>

            <Routes>
              <Route exact path="/FinanceReact" element={<Home />} />
              <Route path="/FinanceReact/news" element={<NewsAV company='TSLA' />} />
              <Route path="/FinanceReact/ticker" element={<div>search</div>} />

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
            </div>

            <div>
              <h1>
                Current News
              </h1>
            </div>
            <div className='newsOuter'>
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
            </div>
            <div className='footer'>

            </div> */}


            </Routes>
          </div>
      </>
    </BrowserRouter>
  );
}

export default App;

// URL: 
// Git issues: https://stackoverflow.com/questions/5335197/gits-famous-error-permission-to-git-denied-to-user
// React Router: https://reactrouter.com/en/main/components/routes
