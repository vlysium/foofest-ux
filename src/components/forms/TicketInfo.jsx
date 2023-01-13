import { useState } from "react";
import { DatePicker } from "antd";
import { useSubmit } from "react-router-dom";
// https://bobbyhadz.com/blog/react-check-if-email-is-valid

function TicketInfo({ type, finishedAdding, fullName, eMail, inputHandleChange }) {
  const [error, setError] = useState(false);
  const [fullname, setFullname] = useState(fullName !== "" ? fullName : "");
  const [email, setEmail] = useState(eMail !== "" ? eMail : "");

  // validate the email
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    //console.log(!isValidEmail(event.target.value));
    setEmail(event.target.value);
    inputHandleChange();
    finishedAdding();
  };

  function handleBlur(event) {
    if (!isValidEmail(event.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
  }

  // validate the name
  const onInputChange = (e) => {
    const { value } = e.target;
    //console.log('Input value: ', value);

    const re = /^[a-zæøåäöü\s]+$/gi;
    if (value === "" || re.test(value)) {
      setFullname(value);
    }
    finishedAdding();
  };
  const dateFormatList = "DD/MM/YYYY";

  return (
    <details className="ticketInfo" open>
      <summary>
        <span className="type">{type}</span> TICKET
      </summary>
      <fieldset className="ticket-info">
        <label className="label-fullname">
          Fullname{" "}
          <input
            type="text"
            name="fullname"
            className="fullname"
            autoComplete="name"
            onChange={onInputChange}
            value={fullname}
          />
        </label>

        <label className="label-email">
          Email{" "}
          <input
            type="email"
            name="email"
            className={error ? "email invalid" : "email"}
            autoComplete="email"
            onChange={handleChange}
            value={email}
            onBlur={handleBlur}
          />
          <span className={error ? "field-required" : "field-required hidden"}>Your email is invalid</span>
        </label>

        <label className="label-birthday">
          Birthday{" "}
          <DatePicker
            onChange={finishedAdding}
            className="birthday"
            placeholder="Select date"
            //defaultValue={dayjs("01/01/2000", dateFormatList)}
            format={dateFormatList}
          />
        </label>
      </fieldset>
    </details>
  );
}

export default TicketInfo;
