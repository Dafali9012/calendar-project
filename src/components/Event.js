import React, { useEffect, useState, useContext, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
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
  const [selectedEmails, setSelectedEmail] = useState([]);
  let dateFrom = [];
  let dateTo = [];

  function selectItem(e) {
    console.log("selected ", e);
  }

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

  return (
    <div className="row">
      <div className="pt-4 col-12 d-flex flex-column padx-20">
        <h4 className="text-center">
          <strong>
            <u>{event.title}</u>
          </strong>
        </h4>
        <div className="d-flex justify-content-center mt-4">
          <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center mx-5">
              {dateFrom[0]}-{dateFrom[1]}-{dateFrom[2]}
            </h5>
            <h5 className="text-center mx-5">
              {dateFrom[3]}:{dateFrom[4]}
            </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center mx-5">
              {dateTo[0]}-{dateTo[1]}-{dateTo[2]}
            </h5>
            <h5 className="text-center mx-5">
              {dateTo[3]}:{dateTo[4]}
            </h5>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex mt-4 justify-content-center">
        <button className="btn-sm btn-primary">Attend Event</button>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-center">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Select
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {emailList.map((email) => {
              return (
                <Dropdown.Item
                  value={email}
                  onClick={ e => selectItem(e)}
                  as="button"
                  key={email.id}
                >
                  {email.email}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-center">
        {selectedEmails
          ? selectedEmails.map((selected) => {
              return (
                <button type="button" class="btn m-1 btn-outline-info">
                  {selected.email} X
                </button>
              );
            })
          : ""}
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
