import React, { useState } from "react";

import axios from "axios";

export default function Mail() {
  const [values, setValues] = useState({
    email: "",
    message: "",
  });
  const { email, message } = values;
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setValues({
      email: "",
      message: "",
    });
    try {
      await axios
        .post(process.env.REACT_APP_DOMAIN, {
          email: email,
          message: message,
          from: email,
        })
        .then(() => {
          console.log("successfully send");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <form onSubmit={sendEmail}>
        <h1>Send Mail</h1>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Email Address.."
            name="email"
            value={email}
            onChange={handleOnChange}
          />
        </div>

        <div className="field">
          <label htmlFor="message">Messsage</label>
          <input
            type="text"
            placeholder="Message request.."
            name="message"
            value={message}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
