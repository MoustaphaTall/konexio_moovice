import React, { Component } from 'react';
import placeholder from "../../placeholder.png"
import "./Card.css";


class Card extends Component {    
    render() {
        const { name, description, src, onClick } = this.props;
        return (
            <div className="col-6 col-lg-4">
                <div className="card" onClick={onClick}>
                    <img 
                        className="card-img-top" 
                        src={!src ? placeholder : `https://image.tmdb.org/t/p/w300/${src}`} 
                        alt={`${name}'s poster`} 
                    />
                    <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;