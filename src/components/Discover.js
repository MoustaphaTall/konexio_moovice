import React, { Component } from 'react';
import Card from './movie/Card';
import moment from 'moment';

class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let { movies } = this.state;  
        const today = moment().format('YYYY-MM-DD');
        const nextWeek = moment().add(1, "weeks").format('YYYY-MM-DD');        
        const url = `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${today}&primary_release_date.lte=${nextWeek}&api_key=f1eb893bc12d8a9983bfa29357769a56`;

        fetch(url)
            .then(result => result.json())
            .then(json => json.results)
            .then(json => {
                movies = json.map(movie => ({ 
                    name: movie.title, 
                    description: movie.overview, 
                    src: movie.poster_path,
                    movieID: movie.id 
                }));

                this.setState({movies});
            });
    }

    renderCards() {
        const { movies } = this.state;        

        if (movies.length === 0) {
            return <h2>Loading…</h2>
        }

        return movies.map(movie => {
            return (
                <Card 
                    {...movie}
                    key={movie.movieID}
                />
            );
        });
    }


    render() {           
        // console.log(this.state.movies);          
        return (
            <div>
                <div className="container">
                    <div className="row">                        
                        {this.renderCards()}
                    </div>
                </div>                
            </div>
        );
    }
}

export default Discover;