const express = require('express')
var yahooFinance = require('yahoo-finance');
var googleFinance = require('google-finance2');
const yahooFinance2 = require('yahoo-finance2').default;
var bodyParser = require('body-parser');
const app = express()
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Enable CORS for all origins
// app.use(cors());
app.use(cors({
  origin: '*', // or '*' for all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));
// const port = 3001
// const port = '0.0.0.0:3001'
// const port = process.env.PORT || 3001
const port = process.env.PORT || 8080


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Finance React app listening on port ${port}`)
})

app.post('/yahoo', async (req, res) => {
  // console.log('ticker: ', req.body.ticker)
  let data = await getData(req.body.ticker)
  // let data = await getData('SPY')
  // let dataJson = await data.json()
  res.send(data)
})

let n = async () => {
  const queryOptions = { modules: ['price', 'summaryDetail'] }; // defaults
  let d
  try{
    d = await yahooFinance2.quote("TSLA")
    // d = await yahooFinance2.quoteSummary("TSLA",queryOptions)
    // d = await googleFinance.companyNews({ 
    //   symbol: "TSLA",
    //   lang: 'en'})
  }catch(err){
    console.log('error:::', err)
  }
  // let d = await yahooFinance2.search('AAPL', { someOption: true, etc });
  // console.log('yahoo qoute: ', d)

  // let result = yahooFinance2.quote({
  //   symbol: 'AAPL',
  //   modules: 'summaryDetail' // see the docs for the full list
  // }, function (err, quotes) {
  //   // ...
  //   if(err){
  //     console.log('ERROR ------------------ ', err)
  //   }else{
  //     console.log('quotes---------------: ', quotes)
  //     return quotes
  //   }
  // });
  console.log('results: ', d)
}
// n()

app.post('/api/getQuote', async (req, res) => {
  let result
  try {
    result = await yahooFinance2.quote(req.body.ticker);
    // result = yahooFinance2.quote({
    //   symbol: 'AAPL',
    //   modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
    // }, function (err, quotes) {
    //   // ...
    //   console.log('quotes: ', quotes)
    //   return quotes
    // });
    // result = await yahooFinance2.quoteSummary(req.body.ticker);
    // result = await yahooFinance2.search('AAPL', { someOption: true, etc });
    // result = await yahooFinance2.companyNews(req.body.ticker);

  } catch (error) {
    result = error
  }
  res.send(result)
})

// GOOGLE API to get the news
app.post('/api/getNews', async (req, res) => {
  let result
  try {
    // result = await googleFinance.historical({
    //   symbol: 'NASDAQ:AAPL',
    //   from: '2024-01-01',
    //   to: '2024-02-03'
    // }, function (err, quotes) {
    //   //...
    //   // console.log('google quotes: ', quotes)
    //   return quotes
    //   // res.send(quotes)
    // });

    result = await googleFinance.companyNews({ symbol: req.body.ticker },
      (err, news) => {
        return news
      });
  } catch (error) {
    result = error
  }
  res.send(result)
})

// googleFinance.historical({
//   symbol: 'NASDAQ:AAPL',
//   from: '2014-01-01',
//   to: '2014-12-31'
// }, function (err, quotes) {
//   //...
//   console.log('google quotes: ', quotes)
// });


// googleFinance.companyNews({
//   symbol: "TYO:6664",
//   lang: 'en'
// }, function (err, news) {
//   //...
//   if(err){
//     console.log('error------------', err)
//   }else{
//     console.log('google news: ', news)

//   }
// });

// let ne = async () => {
//   let d = await googleFinance.companyNews({ "symbol": "NYSE:TWTR" })
//   console.log('new news: ', d)
// };

// ne()
// const g = async () => {
//   try{
//     let result = await yahooFinance2.quote('AAPL');
//     console.log("results: ", result)
//   }catch(error){
//     console.log(error)
//   }
// }
// g()

const getData = async (ticker) => {
  // const today = new Date();
  // const formattedDate = today.toISOString().split('T')[0].replace(/-/g, '-');
  // let year = Number(formattedDate.substring(0, 4))
  // let month = formattedDate.substring(5, 7)
  // let day = formattedDate.substring(8, 10)
  // let newYear = year - 10
  // let pastDate = newYear.toString() + '-' + month + '-' + day

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const historicaldDate = `${year - 100}-${month}-${day}`;

  let events = {
    // period1: '2012-01-01',
    period1: historicaldDate,
    // period2: '2012-12-31',
    period2: formattedDate,
  }
  console.log('events ', events)
  let results = ''
  try {
    results = await yahooFinance2.historical(ticker, events);
    // yahooFinance2.historical({
    //   symbol: 'AAPL',
    //   from: '2012-01-01',
    //   to: '2012-12-31',
    //   // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    // }, function (err, quotes) {
    //   console.log('quotes, ', quotes)
    //   //...
    // });
    // results = await googleFinance.historical(ticker, events);
    // googleFinance.historical({
    //   symbol: 'NASDAQ:AAPL',
    //   from: '2014-01-01',
    //   to: '2014-12-31'
    // }, function (err, quotes) {
    //   console.log('quotes ', quotes)
    //   //...
    // });
  } catch (err) {
    console.log(err)
  }
  // console.log('results: ', results)
  return results
}
// getData()

// const dataApi = (quotes) => {
//     app.get('/yahoo', (req, res) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify(quotes, null, 3))
//       })
// }

// yahooFinance.historical({
//     symbol: 'GOOG',
//     // Get today
//     from: '2010-01-01',
//     // check for max
//     to: '2023-12-31',
//     // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
//   }, function (err, quotes) {
//         dataApi(quotes)
//     // app.get('/yahoo', (req, res) => {
//     //     res.setHeader('Content-Type', 'application/json');
//     //     res.send(JSON.stringify(quotes, null, 3))
//     //   })

//     // console.log('Yahoo: ', quotes)
//   });


const googleApi = (quotes) => {
  app.get('/google', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(quotes, null, 3))
  })
}

googleFinance.historical({
  symbol: 'NASDAQ:AAPL',
  // Get today
  from: '2010-01-01',
  // check for max
  to: '2023-12-31',
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
  // console.log('google: ', quotes[0])

      googleApi(quotes)
  // app.get('/yahoo', (req, res) => {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.send(JSON.stringify(quotes, null, 3))
  //   })

  // console.log('google: ', quotes)
});


// yahooFinance.quote({
//   symbol: 'AAPL',
//   modules: [ 'price', 'summaryDetail' ]
// }, function (err, news) {
//   //...
//   console.log('apple news: ', news)
// });


// googleFinance.historical({
//   symbol: 'NASDAQ:AAPL',
//   from: '2014-01-01',
//   to: '2014-12-31'
// }, function (err, quotes) {
//   console.log('apple quote: ', quotes)
//   //...
// });