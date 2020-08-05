import React, { Component } from 'react';
import Card from './movie/Card';
import Api from '../utils/Api';

class MyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movieIds: this.getFromLocalStorage()
        }
    }

    componentDidMount() {     
        let { movieIds, movies } = this.state;

        if (movieIds !== null) {
            const promises = movieIds.map(iD => Api.getMovie(iD));
            // console.log(promises);
            Promise.all(promises)
                .then(json => {
                    movies = json.map(movie => ({ 
                        name: movie.title, 
                        description: movie.overview, 
                        src: movie.poster_path,
                        movieID: movie.id 
                    }));
                    
                    this.setState({ movies })
                } );   
        }
    }

    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem("my-list"));
    }

    renderCards() {
        const { movies, movieIds } = this.state;

        if (movieIds === null) {
            return <h2>Choose some films in Battles to save them here</h2>
        }
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
        // console.log(localStorage);          
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>My List</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}

export default MyList;