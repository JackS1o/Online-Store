import React, { Component } from 'react';
import { BsCart, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
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

  func = (x) => {
    const { productList } = this.props;
    const j = productList.filter((item) => item === x);
    console.log(j.length);
    this.setState({ d: j.length });
  }

  render() {
    const { productList } = this.props;
    const { d } = this.state;
    // https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript#:~:text=O%20que%20este%20c%C3%B3digo%20faz,indice%20que%20a%20fun%C3%A7%C3%A3o%20passa.

    const a = productList.filter((este, i) => productList.indexOf(este) === i);
    console.log(d);
    const { contador } = this.state;
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
        <p data-testid="shopping-cart-product-quantity">{a.length}</p>
        <div className="div-mae-card-carrinho">
          {a.map((elem) => (
            <div
              key={ elem.title }
              data-testid="shopping-cart-product-name"
              className="card-carrinho"
            >
              <p data-testid="shopping-cart-product-name">{ elem.title }</p>
              <img src={ elem.thumbnail } alt="Imagem" className="img-card" />
              <p>{ elem.price }</p>
              <div>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  disabled={ contador < 1 }
                  onClick={ this.handleClickMenos }
                >
                  -

                </button>
                <p>{ contador }</p>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ this.handleClickMais }
                >
                  +

                </button>
              </div>
            </div>
          ))}
        </div>
        <button data-testid="shopping-cart-button" type="button">Finalizar Compra</button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(Object).isRequired,
};

export default ShoppingCart;
