import React, { Component } from 'react';
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
            <p>{ item.title }</p>
            <img src={ item.thumbnail } alt="Imagem" className="img-card" />
            <p>{ item.price }</p>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleClick(item) }
              type="button"
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
