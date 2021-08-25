import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = name.current.value;
    const enteredStreet = street.current.value;
    const enteredPostal = postal.current.value;
    const enteredCity = city.current.value;

    const enteredNameIsVald = !isEmpty(enteredName);
    const enteredStreetIsVald = !isEmpty(enteredStreet);
    const enteredPostalIsVald = isFiveChars(enteredPostal);
    const enteredCityIsVald = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsVald,
      street: enteredStreetIsVald,
      postal: enteredPostalIsVald,
      city: enteredCityIsVald,
    });

    const formIsValid =
      enteredNameIsVald &&
      enteredStreetIsVald &&
      enteredPostalIsVald &&
      enteredCityIsVald;

    if (!formIsValid) {
      return;
    }

    //Submit cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const name = useRef();
  const street = useRef();
  const postal = useRef();
  const city = useRef();

  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={name} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Your street</label>
        <input type="text" id="street" ref={street} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Your postal code</label>
        <input type="text" id="postal" ref={postal} />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code! (5 characther long)</p>
        )}
      </div>

      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">Your city</label>
        <input type="text" id="city" ref={city} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
