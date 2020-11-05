import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Button } from "react-bootstrap";
import { EventListContext, EmailContext } from "../Store";

export default function Event(props) {
  // eslint-disable-next-line
  const [eventList, setEventList] = useContext(EventListContext);
  const [emailList, setEmailList] = useContext(EmailContext);
  const [selectedEmails, setSelectedEmail] = useState([]);
  const [usersAttending, setUsersAttending] = useState([]);
  let event = eventList[props.location.state.eventPos];
  let dateFrom = [];
  let dateTo = [];

  useEffect(()=>{
    fetchUsersAttending();
    // eslint-disable-next-line
  },[]);

  function invite(){
    //let userInviteList = [];
    for(let emailObject of selectedEmails) {
      console.log(emailObject);
      postToUser_Event({
        eventId: event.id,
        userID: emailObject.id,
        attending: null
      });
    };
  }

  async function fetchUsersAttending() {
    let result = await(await fetch("/api/user/event/"+event.id)).json();
    if(!result.error) setUsersAttending(result);
  }

  function selectEmail(email) {
    if (![...selectedEmails].includes(email)) {
      setSelectedEmail([...selectedEmails, email]);
    }
  }

  function removeSelectedEmail(email) {
    let selected = [...selectedEmails].filter((e) => e !== email);
    setSelectedEmail([...selected]);
  }

  for (let x of event.startDate.split("-")) {
    if (x.length === 1) dateFrom.push("0" + x);
    else dateFrom.push(x);
  }
  for (let x of event.endDate.split("-")) {
    if (x.length === 1) dateTo.push("0" + x);
    else dateTo.push(x);
  }

  async function postToUser_Event(invite) {
    let result = await (
      await fetch(`/api/user_event`, {
        method: "POST",
        body: JSON.stringify(invite),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    if(result.changes){
      setSelectedEmail([])
    }
  }

  async function getEmailList() {
    console.log("fetch")
    let result = await (
      await fetch(`/api/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setEmailList(result)
  }

  console.log("users attending:", usersAttending);

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
        <Dropdown onClick={getEmailList}>
          <Dropdown.Toggle 
          variant="primary" id="dropdown-basic"  >
            Select
          </Dropdown.Toggle>
          <Dropdown.Menu >
            {emailList.map((email) => {
              return (
                <Dropdown.Item
                  onClick={() => selectEmail(email)}
                  as="button"
                  key={email.id}
                >
                  {email.email}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Button 
        onClick={invite}
        className="ml-5" 
        variant="success">
          Invite
        </Button>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-center">
        {selectedEmails
          ? selectedEmails.map((selected) => {
              return (
                <button
                  type="button"
                  key={selected.id}
                  className="btn m-1 btn-outline-info nohover"
                >
                  {selected.email}
                  <span
                    onClick={(e) => removeSelectedEmail(selected)}
                    className="badge badge-danger ml-2"
                  >
                    X
                  </span>
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
          {usersAttending.map((x,i)=>{
            let classes = "mar-0";
            if(x.id===event.author) {
              classes = classes.concat(" ml-2");
            }
            return <div className="col-sm-12 col-md-4 mar-0 card" key={i}>
              <span className="d-flex align-items-center">
                {x.id===event.author?<FontAwesomeIcon icon={faCrown}/>:null}
                <p className={classes}>{x.name}</p>
                {x.attending===null?<FontAwesomeIcon className="ml-auto" icon={faQuestion}/>:
                x.attending==="false"?<FontAwesomeIcon className="ml-auto" icon={faTimes}/>:
                x.attending==="true"?<FontAwesomeIcon className="ml-auto" icon={faCheck}/>:null}
              </span>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}
