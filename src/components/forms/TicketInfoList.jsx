import { useRef } from "react";
import TicketInfo from "./TicketInfo";

function TicketInfoList({ ticket, addToTicket, emptyField, handleChange }) {
  const sectionEl = useRef(null);

  function finishedAdding() {
    event.preventDefault();

    //console.log(sectionEl.current);
    const tickets = [];
    // 1. find alle .ticketInfo.queryselectorALL()
    const formsElements = sectionEl.current.querySelectorAll(".ticketInfo");
    //console.log(formsElements);

    // 2. find alle formfelter og lave et object af hver formfield (object fullname: "", email:"", birthday: "")

    formsElements.forEach((e) => {
      const formInfo = {
        fullname: e.querySelector(".fullname").value,
        email: e.querySelector(".email").value,
        birthday: e.querySelector(".ant-picker-input > input").value,
        type: e.querySelector(".type").textContent,
      };
      tickets.push(formInfo);
    });
    // 3. addToTicket("info", "voresNyeArray" )
    addToTicket("info", tickets);
  }
  return (
    <section ref={sectionEl}>
      <h3>TICKET INFO</h3>
      <div className="fieldset-container">
        <p className={emptyField ? "field-required" : "field-required hidden"}>Please fill in all the fields!</p>
        {[...Array(ticket.r).keys()].map((info, index) => (
          <TicketInfo
            ticket={ticket}
            type={"REGULAR"}
            key={index}
            finishedAdding={finishedAdding}
            fullName={ticket.info[index] ? ticket.info[index].fullname : null}
            eMail={ticket.info[index] ? ticket.info[index].email : null}
            inputHandleChange={handleChange}
          />
        ))}
        {[...Array(ticket.v).keys()].map((info, index) => (
          <TicketInfo
            ticket={ticket}
            type={"VIP"}
            key={index}
            finishedAdding={finishedAdding}
            fullName={ticket.info[index + ticket.r] ? ticket.info[index + ticket.r].fullname : null}
            eMail={ticket.info[index + ticket.r] ? ticket.info[index + ticket.r].email : null}
            inputHandleChange={handleChange}
          />
        ))}
      </div>
    </section>
  );
}

export default TicketInfoList;
