import React from 'react';
import PropTypes from 'prop-types';

class Teste extends React.Component {
  constructor() {
    super();

    this.state = {
      contador: 1,
    };
  }

  // componentDidMount() {
  //   this.cardUpdate();
  //   this.handleClickMais();
  //   this.handleClickMenos();
  // }

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

  cardUpdate = (x) => {
    const { a } = this.props;
    const d = a.filter((i) => i.id !== x);
    console.log(d);
  }

  render() {
    const { elem } = this.props;
    const { contador } = this.state;
    return (
      <div
        data-testid="shopping-cart-product-name"
        className="card-carrinho"
      >
        <p data-testid="shopping-cart-product-name">{ elem.title }</p>
        <img src={ elem.thumbnail } alt="Imagem" className="img-card" />
        <p>{ elem.price }</p>
        <button
          id={ elem.id }
          data-testid="product-increase-quantity"
          type="button"
          disabled={ contador < 1 }
          onClick={ this.handleClickMenos }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{ contador }</p>
        <button
          id={ elem.id }
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ this.handleClickMais }
        >
          +
        </button>
        <div>
          <button
            type="button"
            onClick={ () => this.cardUpdate(elem.id) }
          >
            Remover
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
  a: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Teste;
