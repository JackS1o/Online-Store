import React, { Component } from 'react';
import { BsCart, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <Link
          to="/"
        >
          <BsFillArrowLeftCircleFill />
          <BsCart />
        </Link>
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</h1>
      </div>
    );
  }
}

export default ShoppingCart;
