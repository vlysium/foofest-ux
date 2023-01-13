function Optionals({ ticket, addToTicket }) {
  function handleChange(type, evt) {
    switch (type) {
      case "green":
        if (evt.target.checked) {
          addToTicket("greenCamping", Number(evt.target.value));
        } else {
          addToTicket("greenCamping", Number(0));
        }
        break;

      case "multi":
        if (evt.target.checked) {
          addToTicket("tentAmount", Number(evt.target.value));
        } else {
          addToTicket("tentAmount", Number(0));
        }
        break;
    }
  }
  return (
    <>
      <h3>CAMPING OPTIONALS</h3>
      {ticket.campingArea === "none" && <p>Note: only available with camping.</p>}
      <div className="optionals-wrapper">
        <fieldset className="optionals">
          <label htmlFor="green-camping" className="eco-camping">
            <span>Green camping</span> <span>249,-</span>
          </label>
          <input
            value={249}
            disabled={ticket.campingArea === "none"}
            type="checkbox"
            name="green-camping"
            id="green-camping"
            onChange={(evt) => handleChange("green", evt)}
            checked={ticket.greenCamping !== 0}
          />
          <span className="checkmark"></span>
        </fieldset>
        <p>
          Have the crew to set up {ticket.r + ticket.v} tent{ticket.r + ticket.v === 1 ? "" : "s"} for you
        </p>
        <fieldset className="optionals">
          <label htmlFor="two-person" className="two-camp">
            <span>{ticket.r + ticket.v} person camp</span> <span>{(ticket.r + ticket.v) * 100 + 99},-</span>
          </label>
          <input
            value={(ticket.r + ticket.v) * 100 + 99}
            disabled={ticket.campingArea === "none"}
            type="checkbox"
            name="two-person"
            id="two-person"
            onChange={(evt) => handleChange("multi", evt)}
            checked={ticket.tentAmount !== 0}
          />
        </fieldset>
      </div>
    </>
  );
}

export default Optionals;
