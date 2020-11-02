import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "react-bootstrap";
import { EmailContext } from "../Store";

export default function Event(props) {
  const [event, setEvent] = useState({
    id: 17,
    title: "Go ",
    description: "Goind",
    startDate: "2020-10-31-17-35",
    endDate: "2020-10-31-23-35",
    author: 14,
  });
  const [emailList, setEmailList] = useContext(EmailContext);
  const [list, setlist] = useState([]);
  let dateFrom = [];
  let dateTo = [];

  function isObjectEmpty(obj) {
    for (let x in obj) {
      return false;
    }
    return true;
  }

  if (!isObjectEmpty(event)) {
    for (let x of event.startDate.split("-")) {
      if (x.length === 1) dateFrom.push("0" + x);
      else dateFrom.push(x);
    }
    for (let x of event.endDate.split("-")) {
      if (x.length === 1) dateTo.push("0" + x);
      else dateTo.push(x);
    }
  }

  function mailList() {
    emailList.map((email) => {
      console.log("email -", email.email);
      return <Dropdown.Item>{email.email}</Dropdown.Item>;
    });
  }

  return (
    <div className="row">
      <div className="pt-4 col-12 d-flex flex-column padx-20">
        <h3 className="text-center">
          <strong>
            <u>{event.title}</u>
          </strong>
        </h3>
        <div className="d-flex justify-content-center mt-4">
          <div className="d-flex flex-column justify-content-center">
            <h4 className="text-center mx-5">
              {dateFrom[0]}-{dateFrom[1]}-{dateFrom[2]}
            </h4>
            <h4 className="text-center mx-5">
              {dateFrom[3]}:{dateFrom[4]}
            </h4>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h4 className="text-center mx-5">
              {dateTo[0]}-{dateTo[1]}-{dateTo[2]}
            </h4>
            <h4 className="text-center mx-5">
              {dateTo[3]}:{dateTo[4]}
            </h4>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex mt-4 justify-content-center">
        <button className="btn-sm btn-primary">Attend Event</button>
      </div>
      <div className="col-12 d-flex mt-4 justify-content-end">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {emailList.map((email) => {
            return (
              <Dropdown.Item key={email.email}>{email.email}</Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      </div>
      <div className="pt-4 col-12 d-flex flex-column padx-20">
        <h4 className="mt-4">Description</h4>
        <p>{event.description}</p>
      </div>
      <div className="col-12 d-flex flex-column mt-4 padx-15">
        <h4>Attendees</h4>
        <div className="row">
          <p className="col-4 mar-0">
            Attendee Number One{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Two{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Three{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Four{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Five{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Six{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Seven{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
          <p className="col-4 mar-0">
            Attendee Number Eight{" "}
            <span className="text-muted" style={{ fontSize: ".75em" }}>
              #12345
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
