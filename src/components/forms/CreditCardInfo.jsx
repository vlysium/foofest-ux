import { useState } from "react";

function CreditCardInfo({ finishedAdding, emptyField, ticket, handleChange }) {
  const [txt, setTxt] = useState(ticket.payment ? ticket.payment[0].cardholder : "");
  const [creditNum, setCreditNum] = useState(
    ticket.payment && ticket.payment[0].number !== 0
      ? ticket.payment[0].number.toString().replace(/\d{4}(?=.)/g, "$& ")
      : ""
  );
  const [creditNumSpan, setCreditNumSpan] = useState(false);
  const [month, setMonth] = useState(ticket.payment && ticket.payment[0].month !== 0 ? ticket.payment[0].month : "");
  const [monthSpan, setMonthSpan] = useState(false);
  const [year, setYear] = useState(ticket.payment && ticket.payment[0].year !== 0 ? ticket.payment[0].year : "");
  const [yearSpan, setYearSpan] = useState(false);
  const [cvc, setCvc] = useState(ticket.payment && ticket.payment[0].cvc !== 0 ? ticket.payment[0].cvc : "");
  const [cvcSpan, setCvcSpan] = useState(false);
  const [focusing, setFocusing] = useState(false);

  // changes focus
  const input = document.querySelectorAll("input");
  input.forEach((e, i) => {
    e.addEventListener("input", () => {
      if (e.value.length === e.maxLength && i < 4) {
        input[i + 1].focus();
      }
    });
  });

  // set field values
  const onInputChange = (e) => {
    if (e.target.id === "cardholder") {
      const value = e.target.value;

      const re = /^[a-zæøåäöü\s]+$/gi;
      if (value === "" || re.test(value)) {
        setTxt(value);
      }
    } else if (e.target.id === "cardnumber") {
      const value = e.target.value
        .replace(/[^0-9]/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();

      const re = /^[\d\s]+$/g;
      if (value === "" || re.test(value)) {
        setCreditNum(value);
      }
    } else if (e.target.id === "expire-month") {
      const value = e.target.value;

      const re = /^[\d]+$/g;
      if (value === "" || re.test(value)) {
        setMonth(value);
      }
    } else if (e.target.id === "expire-year") {
      const value = e.target.value;

      const re = /^[\d]+$/g;
      if (value === "" || re.test(value)) {
        setYear(value);
      }
    } else if (e.target.id === "cvc") {
      const value = e.target.value;

      const re = /^[\d]+$/g;
      if (value === "" || re.test(value)) {
        setCvc(value);
      }
    }

    handleChange();
    finishedAdding();
  };

  // validate name & field length
  function handleBlur(e) {
    if (e.target.id === "cardnumber") {
      if (e.target.value.length < 19) {
        setCreditNumSpan(true);
      } else {
        setCreditNumSpan(false);
      }
    } else if (e.target.id === "expire-month") {
      setFocusing(false);
      if (e.target.value.length < 2) {
        setMonthSpan(true);
      } else {
        setMonthSpan(false);
      }
    } else if (e.target.id === "expire-year") {
      setFocusing(false);
      if (e.target.value.length < 2) {
        setYearSpan(true);
      } else {
        setYearSpan(false);
      }
    } else if (e.target.id === "cvc") {
      if (e.target.value.length < 3) {
        setCvcSpan(true);
      } else {
        setCvcSpan(false);
      }
    }

    finishedAdding();
  }

  return (
    <>
      <h3 className="credit-headline">CREDITCARD INFO</h3>
      <p className={emptyField ? "field-required" : "field-required hidden"}>Please fill in all the fields!</p>
      <fieldset id="creditcard-info" className={emptyField ? "creditcard-info invalid" : "creditcard-info"}>
        <label htmlFor="cardholder" className="cardholder">
          Cardholder fullname{" "}
          <input
            type="text"
            name="cardholder"
            className="card-holder"
            id="cardholder"
            required
            autoComplete="name"
            onChange={onInputChange}
            onBlur={handleBlur}
            value={txt}
          />
        </label>
        <label htmlFor="cardnumber" className="cardnumber">
          Cardnumber
          <input
            type="text"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            name="cardnumber"
            className={creditNumSpan ? "card-number invalid" : "card-number"}
            id="cardnumber"
            pattern="[0-9]"
            inputMode="numeric"
            maxLength="19"
            minLength="19"
            required
            onChange={onInputChange}
            onBlur={handleBlur}
            value={creditNum}
          />
          {creditNumSpan ? <span className="field-required">Field Required</span> : null}
        </label>

        <label htmlFor="expires" className="expires">
          Expire
          <div
            className={
              focusing
                ? "expire-container focus-visible"
                : monthSpan || yearSpan
                ? "expire-container invalid"
                : "expire-container"
            }
          >
            <input
              type="text"
              name="expires"
              className="expire-month"
              id="expire-month"
              pattern="[0-9]"
              inputMode="numeric"
              maxLength="2"
              minLength="2"
              placeholder="mm"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              required
              onChange={onInputChange}
              onBlur={handleBlur}
              value={month}
              onFocus={() => setFocusing(true)}
            />{" "}
            /
            <input
              type="text"
              name="expires"
              className="expire-year"
              id="expire-year"
              pattern="[0-9]"
              inputMode="numeric"
              onInput={(e) => {
                if (e.target.value.length > e.target.maxLength)
                  e.target.value = e.target.value.slice(0, e.target.maxLength);
              }}
              maxLength="2"
              minLength="2"
              placeholder="yy"
              required
              onChange={onInputChange}
              onBlur={handleBlur}
              value={year}
              onFocus={() => setFocusing(true)}
            />
          </div>
          {monthSpan || yearSpan ? <span className="field-required">Field Required</span> : null}
        </label>

        <label htmlFor="cvc" className="cvc">
          CVC{" "}
          <input
            type="text"
            name="cvc"
            className={cvcSpan ? "cvc-number invalid" : "cvc-number"}
            id="cvc"
            pattern="[0-9]"
            inputMode="numeric"
            maxLength="3"
            onInput={(e) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            minLength="3"
            required
            onChange={onInputChange}
            onBlur={handleBlur}
            value={cvc}
          />
          {cvcSpan ? <span className="field-required">Field Required</span> : null}
        </label>
      </fieldset>
      {/*  <button>COMPLETE PAYMENT</button> */}
    </>
  );
}

export default CreditCardInfo;
