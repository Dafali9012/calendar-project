import React from 'react';

export default function monthview(){

    let date = new Date()

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    //Calculate weeknumber
    // eslint-disable-next-line
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
    //Calculate number of days in month
    let getDaysInMonth = function(month,year) {
       return new Date(year, month, 0).getDate();
    }; 
  
    let currentWeek = (date).getWeek();
    let currentYear = date.getFullYear()
    let currentMonth = date.getMonth()
    let numberOfcurrentMonth = (currentMonth+1) //Returns the month represented as a number

    let daysInMonth = getDaysInMonth(numberOfcurrentMonth,currentYear) //Calculate number of days in current month
    let dateOfMonth = []
    for(let startDate = 1; startDate<=daysInMonth; startDate++){       //Create an array with the length of current month
        dateOfMonth.push(startDate)
        console.log(dateOfMonth.length)
    }

    return (
        <div className="container">
            <div className="row mb-5">
            <div className="h3 text-center col-1 my-auto">{currentYear}</div>
            <div className="h1 text-center col">{monthNames[currentMonth]}</div>
            </div>
            <div className="row">
            <div className="h5 col">{currentWeek}</div>
            </div>
        <div className="row mb-5">
            {dateOfMonth.map(dateOfMonth => 
            (
            <div className="col-2 border p-4" key={dateOfMonth}>{dateOfMonth} {dayNames[new Date((monthNames[currentMonth])+ dateOfMonth + ', '+currentYear).getDay()]}</div>
            ))}
        </div>
        </div>
      );
}

