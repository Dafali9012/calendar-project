import React, {useState} from 'react';

export default function MonthView(){

    let today = new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    //Calculate weeknumber
    // eslint-disable-next-line
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
    //Calculate number of days in month
    function getNumberOfDaysInMonth(month,year) {
       return new Date(year, month, 0).getDate();
    }; 
  
    let currentWeek = today.getWeek();
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth()
    let numberOfcurrentMonth = (currentMonth+1) //Returns the month represented as a number
    const [month, setMonth] = useState(currentMonth);
    //const [year, setYear] = useState(currentYear);

   /* function decrementYear(){
        setYear(year-1)
    }*/
    function nextMonth(){
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        setMonth((month + 1) % 12) 
    }
    function prevMonth(){
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        setMonth((month === 0) ? 11 : month - 1)
    }

    let daysInMonth = getNumberOfDaysInMonth(numberOfcurrentMonth,currentYear) //Calculate number of days in current month
    let dateOfMonth = []
    for(let startDate = 1; startDate<=daysInMonth; startDate++){       //Create an array with the length of current month
        dateOfMonth.push(startDate)
    }
    let dateAndDay = []                                                //Create an array with a date and matching dayname
    dateOfMonth.forEach(element => {
        element = element + ' ' + dayNames[new Date((monthNames[month])+ element + ', '+currentYear).getDay()]
        dateAndDay.push(element)
    });

    let firstWeek = []
    let secondWeek = []
    let thirdWeek = []
    let fourthWeek = []
    let fifthWeek = []
    
    for(let i = 0; i<=dateAndDay.length; i++){
        firstWeek.push(dateAndDay[i])
        if(dateAndDay[i].includes('Sunday')){
            for(i++; i<=dateAndDay.length; i++){
                secondWeek.push(dateAndDay[i])
                if(dateAndDay[i].includes('Sunday')){
                    for(i++; i<=dateAndDay.length; i++){
                        thirdWeek.push(dateAndDay[i])
                        if(dateAndDay[i].includes('Sunday')){
                            for(i++; i<=dateAndDay.length; i++){
                                fourthWeek.push(dateAndDay[i])
                                if(dateAndDay[i].includes('Sunday')){
                                    for(i++; i<dateAndDay.length; i++){
                                        fifthWeek.push(dateAndDay[i])
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    return (
         <div className="container">
            <div className="row mb-5">
            <div className="h5 text-center col my-auto">{currentYear}</div>
            <button onClick={() => prevMonth()} type="button" className="btn btn-primary btn-sm">Prev</button>
            <div className="h1 text-center col">{monthNames[month]}</div>
            <button onClick={() => nextMonth()} type="button" className="btn btn-primary btn-sm">Next</button>
            <div className="h5 text-center col my-auto">{currentWeek}</div>
            </div>
        <div className="row float-right w-100">
            {firstWeek.map(firstWeek => 
            (<div className="col border p-4" key={firstWeek}>{firstWeek}</div>))}
        </div>
        <div className="row float-right w-100">
            {secondWeek.map(secondWeek => 
            (<div className="col border p-4" key={secondWeek}>{secondWeek}</div>))}
        </div>
        <div className="row float-right w-100">
            {thirdWeek.map(thirdWeek => 
            (<div className="col border p-4" key={thirdWeek}>{thirdWeek}</div>))}
        </div>
        <div className="row float-right w-100">
            {fourthWeek.map(fourthWeek => 
            (<div className="col border p-4" key={fourthWeek}>{fourthWeek}</div>))}
        </div>
        <div className="row float-right w-100">
            {fifthWeek.map(fifthWeek => 
            (<div className="col border p-4" key={fifthWeek}>{fifthWeek}</div>))}
        </div>
        </div>
      );
}