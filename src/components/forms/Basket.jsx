import { useState, useEffect } from "react";


function Basket({ ticket }) {
 const [campingPrice, setCampingPrice] = useState(false)
  
 useEffect(() => {
   if (ticket.campingArea === "none" ||ticket.campingArea === undefined) {
      setCampingPrice(false);
   } else {
      setCampingPrice(true);
   }
  },[ticket]);

  return (
    <section id="basket">
      <h3>YOUR ORDER</h3>
      <div className="basket-container">
        <ul>
         
            <li>
            Regular x {ticket.r} , {ticket.r * 799},-
          </li>
          <li>
            VIP x {ticket.v} , {ticket.v * 1299},-
          </li>
          <li>
            Camping {ticket.campingArea} {campingPrice ? "99,-" : ""}
          </li>
        </ul>
        <p>Your total is...</p>
      </div>
    </section>
  );
}

export default Basket;

/*

     {props.cart.map((item) => (
          <li key={item.id}>
            {item.productdisplayname} x {item.amount}, {item.amount * item.price},-
            <button onClick={() => props.removeFromCart(item.id)}>X</button>
          </li>
        ))}

*/