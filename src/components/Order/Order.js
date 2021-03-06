import classes from "./Order.module.css";

const order = (props) => {
  let transformedIngredients = [];
  for (let nameIngredient in props.ingredients) {
    transformedIngredients.push({
      name: nameIngredient,
      amount: props.ingredients[nameIngredient],
    });
  }

  const ingredientOutput = transformedIngredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} ({ingredient.amount}){" "}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        <strong>Price: {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
