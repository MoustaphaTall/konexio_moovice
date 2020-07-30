import React, { Component } from 'react';
import Card from './movie/Card';

class PopularBattle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            currentPage: 1
        }
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
                    src: movie.poster_path
                }));

                this.setState({ movies });
                return;
            });            
    }

    renderCards() {
        const { movies } = this.state;        

        if (movies.length === 0) {
            return <h2>Loading…</h2>
        }

        return movies.map((movie, index) => {
            return (
                <Card 
                    name={movie.name}
                    description={movie.description} 
                    src={movie.src}
                    key={index}
                />
            );
        });
    }

    render() {
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

export default PopularBattle;