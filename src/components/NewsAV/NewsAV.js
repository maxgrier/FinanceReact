import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AVKey2, AVKey3 } from '../../constants/Constants';

// AV News APi
// https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo


export default class NewsAV extends Component {
    state = {
        url: '',
        data: {},
        title: '',
        description: '',
        image: '',
        link: '',
    }

    setUrl(company) {
        let url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers='
        url += company
        url += '&apikey='
        url += AVKey3

        this.setState({ url: url })
    }

    // Call news API to get news data
    getNews = async () => {
        try {
            let data = await fetch(this.state.url, { method: 'GET' })
            let data2 = await data.json()
            console.log('news av data, ', this.props.company)
            console.log(data2)
            this.setState({ data: data2["feed"] })

            this.setNewsItems()
            return data2
        } catch (error) {
            console.log(error)
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    setNewsItems = () => {
        // let index = this.getRandomInt(5)
        let article
        try{
            article = this.state.data["0"]
        } catch{
            article = this.state.data["2"]
        }
        
        let title = article.title
        if (title.length > 75){
            title = title.substring(0,75) + "..."
        }
        let description = article.summary
        if (description.length > 250){
            description = description.substring(0,250) + "..."
        }
        let img = article.banner_image
        let link = article.url

        this.setState({ title: title, image: img, description: description, link: link })
    }

    NewTab = (url) => {
        window.open(
            url, "_blank");
    }

    componentDidMount() {
        console.log('news AV mounted')
        this.setUrl(this.props.company)
        setTimeout(() => {
            this.getNews()
        }, 500);
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