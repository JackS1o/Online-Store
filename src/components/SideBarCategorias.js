import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class SideBarCategorias extends Component {
  constructor() {
    super();

    this.state = {
      categorias: [],
    };
  }

  async componentDidMount() {
    const promisse = await getCategories();
    this.setState({
      categorias: promisse,
    });
  }

  criarSideBar = () => {
    const { categorias } = this.state;
    const { handleChange } = this.props;
    return categorias.map((categoria, index) => (
      <label htmlFor={ categoria.id } key={ index } data-testid="category">
        { categoria.name }
        <input
          type="radio"
          name="categorias"
          id={ categoria.id }
          onChange={ handleChange }
        />
      </label>
    ));
  }

  render() {
    return (
      <aside className="sideBar">
        {this.criarSideBar()}
      </aside>
    );
  }
}

SideBarCategorias.propTypes = {
  handleChange: PropTypes.func,
};

SideBarCategorias.defaultProps = {
  handleChange: () => {},
};

export default SideBarCategorias;
