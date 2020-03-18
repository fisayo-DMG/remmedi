import React from "react";
import {Link} from 'react-router-dom'

const Prescription = props => {
  const getDatesArray = (start, end) => {
    let datesArray = [];
    let date = new Date(start);

    while (date <= end) {
      datesArray.push(new Date(date).toUTCString());
      date.setDate(date.getDate() + 1);
    }

    return datesArray;
  };

  const { start, end, numOfTimesPerDay, numOfTablets, completedDosage, completeDosage, id } = props;
  let startDate = new Date(start);
  let dateString = startDate.toDateString();
  let endDate = new Date(end);
  let numDays = getDatesArray(startDate, endDate).length;
  let dosage = numOfTimesPerDay === 1 ? "once a day" : `${numOfTimesPerDay} times daily`;
  let duration = numDays === 1 ? "one day" : `${numDays} days`;
  let tabletString = numOfTablets === 1 ? 'one tablet' : `${numOfTablets} tablets`;

  return (
    <div className="gig">
      <h3>{props.name}</h3>
      <p>
        Take {tabletString} {dosage} for {duration} starting from {dateString}.
      </p>
      <ul>
            <li>Completed: <input type='checkbox' name='completedDosage' checked={completedDosage} onChange={() => completeDosage(id)}/></li>
            <li>
              <Link to='/details' className="btn btn-reverse" style={{marginLeft: '40px'}}>
                Details
              </Link>
            </li>
          </ul>
    </div>
  );
};

export default Prescription;
