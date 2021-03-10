import { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    loading: false,
    purchasing: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://react-my-burger-c72d3-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded right now, please try again later</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            purchasable={this.updatePurchaseState(this.props.ings)}
            disabled={disabledInfo}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          continue={this.purchaseContinueHandler}
          cancel={this.cancelHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.cancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (i) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: i }),
    onRemoveIngredient: (i) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: i }),
  };
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

// export default withErrorHandler(BurgerBuilder, axios);
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
