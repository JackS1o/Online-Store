import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import { getProductById } from '../services/api';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
      atributo: [],
      disabled: true,
      email: '',
      rating: '',
      evaluation: '',
    };
  }

  componentDidMount() {
    const { receiveEvaluationFromStorage } = this.props;
    receiveEvaluationFromStorage();
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const promisse = await getProductById(id);
    const atributo = promisse.attributes;
    this.setState({
      product: promisse,
      atributo,
    });
  }

  handleEmailChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      email: valueInput,
    }, () => {
      this.CheckDisabledBtn();
    });
  }

  handleEvaluationChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      evaluation: valueInput,
    });
  }

  handleRateChange = ({ target }) => {
    const valueInput = target.value;
    this.setState({
      rating: valueInput,
    }, () => {
      this.CheckDisabledBtn();
    });
  }

  CheckDisabledBtn = () => {
    const { email, rating } = this.state;
    if (email.length > 0 && rating) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  cardConstructor = () => {
    const { handleClick, handleSubmitClick, evaluationSubmited } = this.props;
    const { product,
      atributo,
      disabled,
      email,
      rating,
      evaluation,
    } = this.state;
    const ratingStars = ['1', '2', '3', '4', '5'];
    const productEvaluations = evaluationSubmited.filter(
      (evaluations) => evaluations.productID === product.id,
    );
    return (
      <div>
        <header>
          <h1>Detalhes do Produto</h1>
        </header>
        <div className="div-mae-details">
          <div className="card-details">
            <p data-testid="product-detail-name">
              { product.title }
            </p>
            <img src={ product.thumbnail } alt="Imagem" className="img-card-details" />
            <p>{ product.price }</p>
            <Link to="/ShoppingCart">
              <button
                className="add-Carrinho"
                type="button"
                onClick={ () => handleClick(product) }
                data-testid="product-detail-add-to-cart"
              >
                Adicionar ao carrinho

              </button>
            </Link>
          </div>
          <div className="details">
            {atributo.map((atribut, index) => (
              <div key={ index }>
                <span>{`${atribut.name}: ${atribut.value_name}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rating-form-container">
          <form className="rating-form">
            <h2 className="h2-avaliacao">Avalie este produto!</h2>
            <label htmlFor="email" className="label-email">
              E-mail
              <input
                type="email"
                id="email"
                name="email"
                placeholder="insira um email"
                data-testid="product-detail-email"
                onChange={ this.handleEmailChange }
                value={ email }
              />
            </label>
            <div className="label-rate">
              {ratingStars.map((rate, index) => (
                <label
                  htmlFor={ rate }
                  key={ index }
                >
                  <BsFillStarFill />
                  <input
                    id={ rate }
                    type="radio"
                    data-testid={ `${index + 1}-rating` }
                    name="rate"
                    value={ rate }
                    onChange={ this.handleRateChange }
                  />
                </label>
              ))}
            </div>
            <label htmlFor="evaluation" className="label-text-area">
              Adicione um comentário:
              <textarea
                id="evaluation"
                placeholder="Deixe sua avaliação"
                data-testid="product-detail-evaluation"
                name="evaluation"
                rows="5"
                cols="30"
                onChange={ this.handleEvaluationChange }
                value={ evaluation }
              />
            </label>
            <button
              className="evaluation-btn"
              type="button"
              data-testid="submit-review-btn"
              disabled={ disabled }
              onClick={ () => {
                handleSubmitClick(email, rating, evaluation, product);
                this.setState({
                  email: '',
                  rating: '',
                  evaluation: '',
                });
              } }
            >
              Enviar Avaliação!
            </button>
          </form>
          <div>
            <div className="feedback">
              { productEvaluations.length === 0 ? (
                <span>
                  Produto sem avaliações!
                </span>
              )
                : (
                  productEvaluations.map((evaluations, index) => (
                    <div key={ index }>
                      <h3>Email:</h3>
                      <p>{ evaluations.email}</p>
                      <h3>Nota:</h3>
                      <p>{ evaluations.rating }</p>
                      <h3>Avaliação:</h3>
                      <p>{ evaluations.evaluation }</p>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.cardConstructor()}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmitClick: PropTypes.func.isRequired,
  evaluationSubmited: PropTypes.arrayOf(Object).isRequired,
  receiveEvaluationFromStorage: PropTypes.func.isRequired,
};

export default Details;
