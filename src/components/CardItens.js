import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardItens extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { searchItens, handleClick } = this.props;
    return (
      <div className="div-mae-card">
        {searchItens.map((item, index) => (
          <div key={ index } data-testid="product" className="div-card">
            <Link to={ `/details/${item.id}` } data-testid="product-detail-link">
              <p className="title">{ item.title }</p>
              <img src={ item.thumbnail } alt="Imagem" className="img-card" />
              <p className="price">{ item.price }</p>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleClick(item) }
              type="button"
              className="add-Carrinho"
            >
              Adicionar ao Carrinho
            </button>
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
  handleClick: PropTypes.func.isRequired,
};

export default CardItens;
