import { ApiClient, DefaultApi } from 'finnhub';

const api_key = ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cfnept1r01qokr93dsr0cfnept1r01qokr93dsrg" // Replace this
const finnhubClient = new DefaultApi()

// Stock candles
// finnhubClient.stockCandles("AAPL", "W", 1590988249, 1676637404, (error, data, response) => {
//     console.log(data)
// });

export default async function GetAPI() {
    let data2
    try{
        console.log('get api data')
        await finnhubClient.stockCandles("AAPL", "W", 1672563600, 1676637404, (error, data, response) => {
            console.log(data)
            data2 = data
            console.log('data2')
            console.log(data2)
            // data2['t'].forEach(element => {
            //     console.log(element)
            // });
            return data;
        });
        
        // const response = await fetch(url);
        // respnseJSON = await response.json()
        // console.log(respnseJSON)
        // return respnseJSON
    }catch(error){
        console.log(error)
    }
    return data2
    
}
// let d = GetAPI();
// console.log('d')
// console.log(d)
//  "resolve": {
//     "fallback": { "querystring": require.resolve("querystring-es3") }
//  },