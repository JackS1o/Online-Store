import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardItens extends Component {
  render() {
    const { searchItens } = this.props;
    return (
      <div className="div-mae-card">
        {searchItens.map((item, index) => (
          <div key={ index } data-testid="product" className="div-card">
            <Link to={ `/details/${item.id}` } data-testid="product-detail-link">
              <p>{ item.title }</p>
              <img src={ item.thumbnail } alt="Imagem" className="img-card" />
              <p>{ item.price }</p>
            </Link>
          </div>
        ))}

      </div>
    );
  }
}

CardItens.propTypes = {
  searchItens: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};

export default CardItens;