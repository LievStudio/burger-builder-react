import { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredients = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span sytle={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredients}</ul>
        <p>Continue to Checkout?</p>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONFIRM
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
