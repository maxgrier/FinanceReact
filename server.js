const express = require('express')
var yahooFinance = require('yahoo-finance');
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const dataApi = (quotes) => {
    app.get('/yahoo', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(quotes, null, 3))
      })
}

// yahooFinance.historical({
//     symbol: 'AAPL',
//     // Get today
//     from: '2012-01-01',
//     // check for max
//     to: '2012-12-31',
//     // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
//   }, function (err, quotes) {
//         dataApi(quotes)
//     // app.get('/yahoo', (req, res) => {
//     //     res.setHeader('Content-Type', 'application/json');
//     //     res.send(JSON.stringify(quotes, null, 3))
//     //   })

//     // console.log('Yahoo: ', quotes)
//   });