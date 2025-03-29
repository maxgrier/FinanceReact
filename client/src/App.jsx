import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import Header from "./components/Header/Header";
import NewHeader from "./components/NewHeader/NewHeader";

// import GetAPI from './functions/Functions';
// import Line from './components/Charts/Line/Line';
// import Line2 from './components/Charts/Line2/Line2';
// import MarketNews from './components/News/MarketNews';
import NewsAV from "./components/NewsAV/NewsAV";
import classes from "./App.module.css";
// import "./AppWhole.css";

import {
  BrowserRouter as Router,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";
import { Route, Routes } from "react-router";
import { createBrowserHistory } from "history";
import Home from "./pages/HomePage/Home";
import StockTicker from "./components/StockTicker/StockTicker";
// import { display } from '@mui/system';

// Example blogs: https://www.nutmeg.com/nutmegonomics
//                https://www.moneycrashers.com/
// List of blogs: https://www.strattoncraig.com/us/insight/six-of-our-favourite-finance-blogs/

// Google Anaylitcs
import ReactGA from "react-ga";
import Photos from "./pages/TickerSearch/TickerSearch";
const TRACKING_ID = "G-VH5SCDKTF2"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const history = createBrowserHistory();

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
  window.scrollTo({ top: 0, behavior: "smooth" });
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function App() {
  const [btnVisible, setBtnVisible] = useState("hidden");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    console.log(window.location.pathname);
    ReactGA.event({
      category: "Home Page View",
      action: "Page View Action",
      label: "Page View Label",
      value: "test",
    });
  }, []);

  // Get the button:
  let mybutton = document.getElementsByClassName("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  let displayStyle = "block";
  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      // mybutton.style.display = "block";
      displayStyle = "block";
      setBtnVisible("block");
      // console.log('scroll: ', document.documentElement.scrollTop)
      // console.log("scroll: ", displayStyle);
    } else {
      // mybutton.style.display = "none";
      displayStyle = "none";
      setBtnVisible("none");
      // console.log("scroll: ", displayStyle, btnVisible);
    }
  }
  // GetAPI()
  return (
    <BrowserRouter history={history}>
      {/* <HashRouter> */}
      <>
        <div className={classes.App}>
          {/* Section for header */}
          {/* <div className='headerDiv'> */}
          {/* <Header /> */}
          <NewHeader/>
          {/* </div> */}
          <div className={classes.tickerDiv}>
            <StockTicker />
          </div>

          <Routes>
            {/* <Route exact path="/FinanceReact" element={<Line />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route
              path="/FinanceReact/news"
              element={<NewsAV company="TSLA" />}
            />
            <Route path="/FinanceReact/ticker" element={<Photos />} />
            <Route path="*" element={<Home />} />
            {/* <Route element={<div>404</div>} />

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
          <button
            onClick={() => topFunction()}
            className={classes.myBtn}
            id={classes[btnVisible]}
            title="Go to top"
            style={{ display: btnVisible }}
          >
            &#8593;
          </button>
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
