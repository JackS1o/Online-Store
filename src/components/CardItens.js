import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardItens extends Component {
  render() {
    const { searchItens } = this.props;
    return (
      <div>
        {searchItens.map((item, index) => (
          <div key={ index } data-testid="product">
            <p>{ item.title }</p>
            <img src={ item.thumbnail } alt="Imagem" />
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
