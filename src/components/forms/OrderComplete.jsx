import { Link } from "react-router-dom";

function OrderComplete() {
  return (
    <section className="order-complete">
      <h3 className="completed">RESERVATION COMPLETED</h3>
      <p className="p-completed">Thank you for your order!</p>
      <Link to="/">
        <button className="btn">Back to home</button>
      </Link>
    </section>
  );
}

export default OrderComplete;
