export default function CampingArea({ spots, addToTicket, ticket }) {
  //console.log(spots);
  return (
    <>
      <h3>CAMPING AREA</h3>
      <p>Pick one of the camping areas of your choice for the price of 99,- DKK:</p>
      <fieldset id="camping-area" className="scene-names">
        <div className="campContainer">
          <label htmlFor="no-camping">No camping</label>
          <input
            onChange={(evt) => addToTicket("campingArea", evt.target.value)}
            type="radio"
            name="area"
            id="no-camping"
            inputMode="numeric"
            value="none"
            checked={ticket.campingArea === "none"}
          />
        </div>

        {spots.map((area, index) => (
          <div className="campContainer" key={index}>
            <label htmlFor={area.area}>{area.area}</label>
            <div className="avail-box">
              <p>{area.available + " left"}</p>
            </div>
            <input
              disabled={ticket.r + ticket.v > area.available}
              onChange={(evt) => addToTicket("campingArea", evt.target.value)}
              type="radio"
              name="area"
              id={area.area}
              inputMode="numeric"
              value={area.area}
              checked={ticket.campingArea === area.area}
            />
          </div>
        ))}
      </fieldset>
      {/*       <div className="button-container">
        <button>BACK</button>
        <button>NEXT</button>
      </div> */}
    </>
  );
}
