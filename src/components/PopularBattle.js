import React, { Component } from 'react';
import Card from './movie/Card';
import Api from '../utils/Api';
import LocalStorage from '../utils/LocalStorage';

class PopularBattle extends Component {
    constructor(props) {        
        super(props);

        this.state = {
            movies: [],
            currentPage: 1,            
        }

        this.onCardClick = this.onCardClick.bind(this);
    }

    componentDidMount() {
        let { movies } = this.state;  

        Api.getPopularMovies()
            .then(json => {
                movies = json.map(movie => ({ 
                    name: movie.title, 
                    description: movie.overview, 
                    src: movie.poster_path,
                    movieID: movie.id
                }));            
                
                this.setState({ movies });                
            });            
    }

    onCardClick(movieID) {
        LocalStorage.save('my-list', movieID);
        this.setState({ 
            currentPage: this.state.currentPage + 1 
        });              
    }

    renderCards() {
        let { movies, currentPage } = this.state;
        const cardsPerPage = 2;
        const lastCardIndex = currentPage * cardsPerPage;
        const firstCardIndex = lastCardIndex - cardsPerPage;
        const currentCards = movies.slice(firstCardIndex, lastCardIndex);

        if (movies.length === 0) {
            return <h2>Loading…</h2>
        }

        if (currentCards.length === 0) {
            return <h2>No movies remaining! Check My List to see those you have selected.</h2>
        }

        return currentCards.map((movie) => {
            return (
                <Card 
                    {...movie}
                    onClick={() => this.onCardClick(movie.movieID)}                    
                    key={movie.movieID}
                />
            );
        });
    }

    render() {                       
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Popular's battle</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">                        
                        {this.renderCards()}
                    </div>
                </div>                
            </div>
        );
    }
}

export default PopularBattle;