import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { react } from 'plotly.js';

import { FinnHubKey1 } from '../../constants/Constants';
import { ApiClient, DefaultApi } from 'finnhub';

// Constants needed for the Finnhub API call
const api_key = ApiClient.instance.authentications['api_key']
api_key.apiKey = FinnHubKey1
const finnhubClient = new DefaultApi()


export default class MarketNews extends Component {
    state = {
        url: '',
        data: {},
        title: '',
        description: '',
        image: '',
        link: '',
    }


    // Get Finnhub company news
    getCompanyNews = async () => {
        // Set today's date and a month ago's date
        let today = Math.floor(Date.now() / 1000)
        let oneMonthAgo = today - 2592000

        today = new Date(today * 1000)
        oneMonthAgo = new Date(oneMonthAgo * 1000)
        console.log('todays date: ', today, oneMonthAgo)

        today = today.toISOString().split('T')[0]
        oneMonthAgo = oneMonthAgo.toISOString().split('T')[0]

        finnhubClient.companyNews(this.props.company, oneMonthAgo, today, (error, data, response) => {
            
            let article
            // Get the first article with an image
            for(let item in data){
                if(data[item].image.length > 3){
                    article = data[item]
                    break
                }
            }
            
            this.setState({finData: data[0], title: article.headline, description: article.summary, image: article.image, link: article.url})
        });
    }
    

    // Get the Finnhub news data
    getFinNews = async () => {
        finnhubClient.marketNews("general", {}, (error, data, response) => {
            // console.log('market news')
            // console.log(data)
            let article = data[this.props.index]
            this.setState({ finData: data[0], title: article.headline, description: article.summary, image: article.image, link: article.url })
        });
    }


    // setUrl(company) {
    //     let url = 'https://newsapi.org/v2/everything?q=' +
    //         company +
    //         '&from=2023-02-05' +
    //         '&sortBy=popularity' +
    //         '&apiKey=ba8e0d742abd4c10851dc96ec88c62f6';

    //     this.setState({ url: url })
    // }

    // // Call news API to get news data
    // getNews = async () => {
    //     console.log()
    //     try {
    //         console.log('get news')
    //         console.log(this.state.url)
    //         let data = await fetch(this.state.url, { method: 'GET' })
    //         let data2 = await data.json()
    //         this.setState({ data: data2 })
    //         console.log('news data')
    //         console.log(data2['articles'])
    //         this.setNewsItems()
    //         return data2
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // setNewsItems = () => {
    //     console.log('article')
    //     let article = this.state.data['articles'][2]
    //     console.log(article)
    //     let title = article['title']
    //     let img = article['urlToImage']
    //     let description = article['description']
    //     let link = article['url']


    //     this.setState({ title: title, image: img, description: description, link: link })
    // }

    NewTab = (url) => {
        console.log('url ', url)
        window.open(
            url, "_blank");
    }

    componentDidMount() {
        if(this.props.type === "general"){
            this.getFinNews()
        }else{
            this.getCompanyNews()
        }
    }

    render() {
        return (
            <div>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={this.state.image}
                        title="news article"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.state.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {this.state.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* <Button size="small">Share</Button> */}
                        <Button size="small" onClick={() => { this.NewTab(this.state.link) }}>Read Article</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}