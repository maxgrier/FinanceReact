import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';

import GetAPI from './functions/Functions';
import Line from './components/Charts/Line/Line';
import Line2 from './components/Charts/Line2/Line2';
import MarketNews from './components/News/MarketNews';
import NewsAV from './components/NewsAV/NewsAV';

import { BrowserRouter as Router, BrowserRouter, HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { createBrowserHistory } from "history";
import Home from './pages/HomePage/Home';
import StockTicker from './components/StockTicker/StockTicker';
import { display } from '@mui/system';

// Google Anaylitcs
import ReactGA from 'react-ga';
const TRACKING_ID = "G-VH5SCDKTF2"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const history = createBrowserHistory()

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

let displayStyle = "block"
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // mybutton.style.display = "block";
    displayStyle = "block";
    // console.log('scroll: ', document.documentElement.scrollTop)
    // console.log('scroll: ', displayStyle)

  } else {
    // mybutton.style.display = "none";
    displayStyle = "none";
    // console.log('scroll: ', displayStyle)

  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  // console.log('scroll: ', document.documentElement.scrollTop)
  // while (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
   
  //   setTimeout(() => {
  //     document.body.scrollTop -= 20; // For Safari
  //     document.documentElement.scrollTop -= 20; // For Chrome, Firefox, IE and Opera
  //     console.log('scroll: ', document.documentElement.scrollTop)
  //    }, 100);
  // }
  window.scrollTo({top: 0, behavior: 'smooth'});
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function App() {

  // GetAPI()
  return (
    <BrowserRouter history={history}>
      {/* <HashRouter> */}
      <>
        <div className="App">

          {/* Section for header */}
          <div className='headerDiv'>
            <Header />
          </div>
          <div className='tickerDiv'>
            <StockTicker />
          </div>

          <Routes>
            {/* <Route exact path="/FinanceReact" element={<Line />} /> */}
            <Route exact path="/FinanceReact" element={<Home />} />
            <Route path="/FinanceReact/news" element={<NewsAV company='TSLA' />} />
            <Route path="/FinanceReact/ticker" element={<div>search</div>} />
            <Route element={<div>404</div>}/>

            {/* <div className='lineOuter'>
              
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
          <button onClick={() => topFunction()} id="myBtn" title="Go to top" style={{ display: "block" }}>&#8593;</button>
        </div>
      </>
      {/* </HashRouter> */}
    </BrowserRouter>
  );
}

export default App;

// URL: 
// Git issues: https://stackoverflow.com/questions/5335197/gits-famous-error-permission-to-git-denied-to-user
// React Router: https://reactrouter.com/en/main/components/routes
