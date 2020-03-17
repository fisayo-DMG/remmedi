import React from "react";
import { data } from "../data";
import Prescription from "./Prescription";

const PrescriptionsList = (props) => {
  // console.log(props);
  const data = props.data;
  const prescriptions = data.map(p => {
    return <Prescription key={p.id} name={p.name} start={p.start} end={p.end} numOfTimesPerDay={p.numOfTimesPerDay} numOfTablets={p.numOFTablets}/>;
  });
  return (
    <>
      <section id="gigs" className="container">
        <h1>Prescriptions</h1>
        {prescriptions}
      </section>
    </>
  );
};

export default PrescriptionsList;
