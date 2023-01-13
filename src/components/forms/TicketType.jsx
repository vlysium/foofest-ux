import { useState } from "react";

function TicketType({ ticket, addToTicket, emptyField, handleChange }) {
  const [regularTickets, setRegularTickets] = useState(ticket.r !== 0 ? ticket.r : "");
  const [vipTickets, setVipTickets] = useState(ticket.v !== 0 ? ticket.v : "");

  function handleInput(type, evt) {
    handleChange();

    const value = evt.target.value;
    const regex = /^[\d]+$/g;

    switch (type) {
      case "regular":
        if (!value || regex.test(value)) {
          setRegularTickets(value);
          addToTicket("r", Number(value));
        }
        break;

      case "vip":
        if (!value || regex.test(value)) {
          setVipTickets(value);
          addToTicket("v", Number(value));
        }
        break;
    }
  }

  return (
    <>
      <div className="type-container">
        <div>
          <h3>TICKET TYPE</h3>
          <div className="fieldset-container">
            <p className={emptyField ? "field-required" : "field-required hidden"}>Please select a ticket type</p>
            <fieldset id="ticket-type" className={emptyField ? "invalid" : null}>
              <label htmlFor="regular" className="regular-label">
                <span>REGULAR </span>
                <span>
                  {" "}
                  <b>799,-</b>
                </span>
              </label>
              <input
                onInput={(evt) => handleInput("regular", evt)}
                type="text"
                name="regular"
                id="regluar-amount"
                pattern="[0-9]"
                inputMode="numeric"
                placeholder="0"
                value={regularTickets}
              />
              <label htmlFor="vip" className="vip-label">
                <span>VIP</span>
                <span>
                  {" "}
                  <b> 1299,-</b>
                </span>
              </label>
              <input
                onInput={(evt) => handleInput("vip", evt)}
                type="text"
                name="vip"
                id="vip-amount"
                pattern="[0-9]"
                inputMode="numeric"
                placeholder="0"
                value={vipTickets}
              />
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketType;
