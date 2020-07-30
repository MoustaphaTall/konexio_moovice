import React, { Component } from 'react';
import placeholder from "../../placeholder.png"


class Card extends Component {    
    render() {
        const { name, description, src } = this.props;
        return (
            <div className="col-6 col-lg-3 card">
                <img className="card-img-top" src={src === null ? placeholder : `https://image.tmdb.org/t/p/w300/${src}`} alt={`${name}'s poster`} />
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        );
    }
}

export default Card;