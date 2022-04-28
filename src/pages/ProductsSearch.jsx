import React, { Component } from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromQuery, getProductsFromCategoryId } from '../services/api';
import SideBarCategorias from '../components/SideBarCategorias';
import CardItens from '../components/CardItens';
import Loading from '../components/Loading';

class ProductsSearch extends Component {
  constructor() {
    super();
    this.state = {
      notFound: false,
      inputValue: '',
      searchItens: [],
      load: false,
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
    this.setState({ load: true });
    const data = await getProductsFromQuery(inputValue);
    if (data.results.length === 0) {
      this.setState({
        notFound: true,
        searchItens: [],
        load: false,
      });
    } else {
      this.setState({
        searchItens: data.results,
        notFound: false,
        load: false,
      });
    }
  }

  handleChange = ({ target }) => {
    const { id } = target;
    this.setState(async () => {
      this.setState({ load: true });
      const promisse = await getProductsFromCategoryId(id);
      this.setState({ searchItens: promisse.results, notFound: false, load: false });
    });
  }

  render() {
    const { handleClick } = this.props;
    const { inputValue, searchItens, notFound, load } = this.state;
    return (
      <div className="search-page">
        <header>
          <h2
            data-testid="home-initial-message"
            className="h2-home"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        </header>
        <label htmlFor="product-input" className="label-input">
          <input
            className="search-input"
            type="text"
            value={ inputValue }
            id="product-input"
            onChange={ this.searchApi }
            data-testid="query-input"
          />
          <button
            className="search-btn"
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
        </label>
        {notFound && <p>Nenhum produto foi encontrado</p>}
        <div className="cardItems-sideBar">
          <SideBarCategorias handleChange={ this.handleChange } />
          {load ? <Loading />
            : (
              <CardItens
                handleClick={ handleClick }
                searchItens={ searchItens }
                className="cardItems"
              />
            )}
        </div>
      </div>
    );
  }
}

ProductsSearch.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ProductsSearch;
