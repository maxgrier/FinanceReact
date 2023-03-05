import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// newsapi.org
// key = ba8e0d742abd4c10851dc96ec88c62f6
// Top News (general):
// var url = 'https://newsapi.org/v2/top-headlines?' +
// 'country=us&' +
// 'apiKey=ba8e0d742abd4c10851dc96ec88c62f6';
// company news: https://newsapi.org/docs/endpoints/everything
// var url = 'https://newsapi.org/v2/everything?' +
// 'q=Apple&' +
// 'from=2023-02-25&' +
// 'sortBy=popularity&' +
// 'apiKey=ba8e0d742abd4c10851dc96ec88c62f6';

export default class News extends Component {
    state = {
        url: '',
        data: {},
        title: '',
        description: '',
        image: '',
        link: '',
    }

    setUrl(company) {
        let url = 'https://newsapi.org/v2/everything?q=' +
            company +
            '&from=2023-02-05' +
            '&sortBy=popularity' +
            '&apiKey=ba8e0d742abd4c10851dc96ec88c62f6';

        this.setState({ url: url })
    }

    // Call news API to get news data
    getNews = async () => {
        console.log()
        try {
            console.log('get news')
            console.log(this.state.url)
            let data = await fetch(this.state.url, { method: 'GET' })
            let data2 = await data.json()
            this.setState({ data: data2 })
            console.log('news data')
            console.log(data2['articles'])
            this.setNewsItems()
            return data2
        } catch (error) {
            console.log(error)
        }
    }

    setNewsItems = () => {
        console.log('article')
        let article = this.state.data['articles'][2]
        console.log(article)
        let title = article['title']
        let img = article['urlToImage']
        let description = article['description']
        let link = article['url']


        this.setState({ title: title, image: img, description: description, link: link })
    }

    NewTab = (url) => {
        console.log('url ', url)
        window.open(
            url, "_blank");
    }

    componentDidMount() {
        console.log('news mounted')
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