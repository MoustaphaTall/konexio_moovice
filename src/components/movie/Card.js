import React, { Component } from 'react';
import placeholder from "../../placeholder.png"
import { IMG_ROOT } from '../../Config';
import "./Card.css";


class Card extends Component {    
    render() {
        const { name, description, src, onClick } = this.props;
        const source = `${IMG_ROOT}/${src}`;
        return (
            <div className="col-6 col-lg-4">
                <div className="card" onClick={onClick}>
                    <img 
                        className="card-img-top" 
                        src={!src ? placeholder : source}
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