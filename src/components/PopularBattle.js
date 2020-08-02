import React, { Component } from 'react';
import Card from './movie/Card';

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
        const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f1eb893bc12d8a9983bfa29357769a56"

        fetch(url)
            .then(result => result.json())
            .then(json => json.results)
            .then(films => {
                films.map(movie => movies.push({
                    name: movie.title, 
                    description: movie.overview, 
                    src: movie.poster_path,
                    movieID: movie.id
                }));

                this.setState({ movies });
                return;
            });            
    }

    onCardClick(movieID) {
        this.saveToLocalStorage(movieID);
        this.setState({ 
            currentPage: this.state.currentPage + 1 
        });              
    }

    saveToLocalStorage(movieID) {        
        const currentList = JSON.parse(localStorage.getItem("my-list")) || [];
        const updatedList = [ ...currentList, movieID ];        

        if (currentList.includes(movieID)) {
            return;
        }        
        
        localStorage.setItem("my-list", JSON.stringify(updatedList));
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

        return currentCards.map((movie, index) => {
            return (
                <Card 
                    name={movie.name}
                    description={movie.description}
                    onClick={() => this.onCardClick(movie.movieID)}
                    src={movie.src}
                    movieID={movie.movieID}
                    key={index}
                />
            );
        });
    }

    render() {        
        // console.log("localStorage", JSON.parse(localStorage.getItem("my-list")));        
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">                        
                        {this.renderCards()}
                    </div>
                </div>                
            </div>
        );
    }
}

export default PopularBattle;