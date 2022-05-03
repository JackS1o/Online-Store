import React, { Component } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
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
    const { handleClick, productList } = this.props;
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
            <FaSearch />
          </button>
          <Link
            className="link-card"
            to="/ShoppingCart"
            data-testid="shopping-cart-button"
            style={ { color: 'white', textDecoration: 'none' } }
          >
            <BsCart4 />
            <p
              className="p-carrinho"
              data-testid="shopping-cart-size"
            >
              {productList.length}
            </p>
          </Link>
        </label>
        <div className="cardItems-sideBar">
          <div className="notFound">
            {notFound && <h1>Nenhum produto foi encontrado</h1>}
          </div>
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
  productList: PropTypes.arrayOf(Object).isRequired,
};

export default ProductsSearch;
