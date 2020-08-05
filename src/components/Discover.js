import React, { Component } from 'react';
import Card from './movie/Card';
import Api from '../utils/Api';


class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let { movies } = this.state;  
        Api.getLatestMovies()
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
                    <div className="col-12 text-center">
                        <h2>This week</h2>
                    </div>
                </div>
                    <div className="row">                        
                        {this.renderCards()}
                    </div>
                </div>                
            </div>
        );
    }
}

export default Discover;