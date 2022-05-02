import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      address: '',
      disabled: true,
      redirect: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ redirect: true });
  }

  verificatioInput = () => {
    const { name, email, cpf, telefone, cep, address } = this.state;
    if (name.length > 0 && email.length > 0
      && cpf.length > 0 && telefone.length > 0 && cep.length > 0 && address.length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificatioInput();
    });
  }

  render() {
    const { name, email, cpf, telefone, cep, address, disabled, redirect } = this.state;
    return (
      <div className="checkout-container">
        <form className="form-checkout">
          <label htmlFor="nome-completo">
            <input
              type="text"
              id="nome-completo"
              data-testid="checkout-fullname"
              value={ name }
              name="name"
              onChange={ this.handleChange }
              placeholder="Nome Completo"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              data-testid="checkout-email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              placeholder="Email"
            />
          </label>
          <label htmlFor="cpf">
            <input
              type="text"
              id="cpf"
              data-testid="checkout-cpf"
              value={ cpf }
              name="cpf"
              onChange={ this.handleChange }
              placeholder="CPF"
            />
          </label>
          <label htmlFor="telefone">
            <input
              type="tel"
              id="telefone"
              data-testid="checkout-phone"
              value={ telefone }
              name="telefone"
              onChange={ this.handleChange }
              placeholder="Telefone"
            />
          </label>
          <label htmlFor="cep">
            <input
              type="text"
              id="cep"
              data-testid="checkout-cep"
              value={ cep }
              name="cep"
              onChange={ this.handleChange }
              placeholder="CEP"
            />
          </label>
          <label htmlFor="address">
            <input
              type="text"
              id="address"
              data-testid="checkout-address"
              value={ address }
              name="address"
              onChange={ this.handleChange }
              placeholder="Endereço"
            />
          </label>
          <button
            onClick={ this.handleClick }
            disabled={ disabled }
            data-testid="checkout-products"
            type="submit"
          >
            Finalizar Compra
          </button>
          { redirect && <Redirect to="/" />}
        </form>
      </div>
    );
  }
}

export default Checkout;
