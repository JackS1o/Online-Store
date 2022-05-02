import React from 'react';
import { BsCartPlus, BsCartDash, BsCartX } from 'react-icons/bs';
import PropTypes from 'prop-types';

class Teste extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 1,
    };
  }

  handleClickMenos = () => {
    this.setState((prevState) => ({
      contador: prevState.contador - 1,
    }));
  }

  handleClickMais = () => {
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
    }));
  }

  render() {
    const { elem, cardUpdate } = this.props;
    const { contador } = this.state;
    return (
      <div
        className="card-carrinho"
      >
        <p data-testid="shopping-cart-product-name" className="title">{ elem.title }</p>
        <img src={ elem.thumbnail } alt="Imagem" className="img-card" />
        <p className="price">{ elem.price }</p>
        <div className="div-add-sub">
          <button
            id={ elem.id }
            data-testid="product-decrease-quantity"
            type="button"
            disabled={ contador < 1 }
            onClick={ this.handleClickMenos }
            className="add"
          >
            <BsCartDash />
          </button>
          <p data-testid="shopping-cart-product-quantity">{ contador }</p>
          <button
            id={ elem.id }
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.handleClickMais }
            className="sub"
          >
            <BsCartPlus />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={ () => cardUpdate(elem) }
            className="remove"
          >
            Remover
            <BsCartX />
          </button>
        </div>
      </div>
    );
  }
}

Teste.propTypes = {
  elem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  productList: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  cardUpdate: PropTypes.func.isRequired,
};

export default Teste;
