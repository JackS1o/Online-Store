import React, { Component } from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import SideBarCategorias from '../components/SideBarCategorias';
import CardItens from '../components/CardItens';

class ProductsSearch extends Component {
  constructor() {
    super();
    this.state = {
      notFound: false,
      inputValue: '',
      searchItens: [],
    };
  }

  searchApi = ({ target }) => {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  searchButton = async () => {
    const { inputValue } = this.state;
    const data = await getProductsFromCategoryAndQuery(inputValue);
    if (data.results.length === 0) {
      this.setState({
        notFound: true,
        searchItens: [],
      });
    } else {
      this.setState({
        searchItens: data.results,
        notFound: false,
      });
    }
  }

  render() {
    const { inputValue, searchItens, notFound } = this.state;
    return (
      <div className="search page">
        <h2
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <label htmlFor="product-input">
          <input
            type="text"
            value={ inputValue }
            id="product-input"
            onChange={ this.searchApi }
            data-testid="query-input"
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.searchButton }
        >
          Pesquisar
        </button>
        <Link
          to="/ShoppingCart"
          data-testid="shopping-cart-button"
        >
          <BsCart />
        </Link>
        {notFound && <p>Nenhum produto foi encontrado</p>}
        <div>
          <CardItens searchItens={ searchItens } />
        </div>
        <SideBarCategorias />
      </div>
    );
  }
}

export default ProductsSearch;
