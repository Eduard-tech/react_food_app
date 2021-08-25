import classes from "./Checkout.module.css"

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  };

  return <form onSubmit={confirmHandler}>
    <div className={classes.control}>
      <label htmlFor="name">Your Name</label>
      <input type='text' id='name' />
    </div>
    
    <div className={classes.control}>
      <label htmlFor="street">Your street</label>
      <input type='text' id='street' />
    </div>

    <div className={classes.control}>
      <label htmlFor="postal">Your postal code</label>
      <input type='text' id='postal' />
    </div>

    <div className={classes.control}>
      <label htmlFor="city">Your city</label>
      <input type='text' id='city' />
    </div>
    <button type="button" onClick={props.onCancel}>Cancel</button>
    <button>Confirm</button>
  </form>
};

export default Checkout;