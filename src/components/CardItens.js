import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardItens extends Component {
  render() {
    const { searchItens } = this.props;
    return (
      <div className="div-mae-card">
        {searchItens.map((item, index) => (
          <div key={ index } data-testid="product" className="div-card">
            <p>{ item.title }</p>
            <img src={ item.thumbnail } alt="Imagem" className="img-card" />
            <p>{ item.price }</p>
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
