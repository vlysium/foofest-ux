import Basket from "./Basket";
import CreditCardInfo from "./CreditCardInfo";
import OrderComplete from "./OrderComplete";
import { useRef } from "react";

function Payment({ ticket, addToTicket, emptyField, payComplet, hideEmptyField }) {
  const sectionEl = useRef(null);
  function finishedAdding() {
    event.preventDefault();

    //console.log(sectionEl.current);
    const creditCard = [];
    // 1. find alle .ticketInfo.queryselectorALL()
    const formsElements = sectionEl.current.querySelectorAll(".creditcard-info");
    //console.log(formsElements);

    // 2. find alle formfelter og lave et object af hver formfield (object fullname: "", email:"", birthday: "")

    formsElements.forEach((e) => {
      const form = {
        number: e.querySelector(".card-number").value.replaceAll(" ", ""),
        month: e.querySelector(".expire-month").value,
        year: e.querySelector(".expire-year").value,
        cvc: e.querySelector(".cvc-number").value,
        cardholder: e.querySelector(".card-holder").value,
      };
      creditCard.push(form);
    });
    // 3. addToTicket("info", "voresNyeArray" )
    addToTicket("payment", creditCard);
  }

  return (
    <>
      {/*   <Basket ticket={ticket} /> */}
      {payComplet ? (
        <>
          <OrderComplete />
          {/* <Basket ticket={ticket} /> */}
        </>
      ) : (
        <section ref={sectionEl}>
          <Basket ticket={ticket} />
          <CreditCardInfo
            finishedAdding={finishedAdding}
            emptyField={emptyField}
            ticket={ticket}
            handleChange={hideEmptyField}
          />
        </section>
      )}
    </>
  );
}

export default Payment;
