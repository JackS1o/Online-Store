import React, { Component } from 'react';
import { BsCart, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        <Link
          to="/"
        >
          <BsFillArrowLeftCircleFill />
          <BsCart />
        </Link>
        {productList.length === 0
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</h1>}
        <p data-testid="shopping-cart-product-quantity">{productList.length}</p>
        <div className="div-mae-card-carrinho">
          {productList.map((elem) => (
            <div
              key={ elem.title }
              className="card-carrinho"
            >
              <p data-testid="shopping-cart-product-name">{ elem.title }</p>
              <img src={ elem.thumbnail } alt="Imagem" className="img-card" />
              <p>{ elem.price }</p>
              <button data-testid="shopping-cart-button" type="button">adicionar</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(Object).isRequired,
};

export default ShoppingCart;
