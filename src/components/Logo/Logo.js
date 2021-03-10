import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={props.height}>
    <img src={burgerLogo} alt="burger logo" />
  </div>
);

export default logo;
