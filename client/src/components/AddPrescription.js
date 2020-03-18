import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const AddPrescription = ({ addPrescription }) => {
  const [state, setState] = useState({
    name: "",
    numOFTablets: "",
    numOfTimesPerDay: "",
    startDate: "",
    endDate: ""
    // duration: []
  });

  // const options = ["one", "two", "three"];

  // const defaultOption = options[0];

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const prescription = {
      // id: Math.floor(Math.random() * 100000000),
      name: state.name,
      numOfTablets: Number(state.numOFTablets),
      numOfTimesPerDay: Number(state.numOfTimesPerDay),
      // startDate: new Date(state.startDate).toDateString(),
      startDate: state.startDate,
      endDate: state.endDate,
      completedDosage: false
    };
    addPrescription(prescription);
  };
  return (
    <>
      <section id="add" className="container">
        <div className="form-wrap">
          <h1>Add A Prescription</h1>
          <p>Lorem Ipsum</p>
          <form onSubmit={handleSubmit} >
            <div className="input-group">
              <label htmlFor="name">Name of Drug</label>
              <input
                type="text"
                name="name"
                id="name"
                className="input-box"
                placeholder="Enter the name of the drug, eg. Panadol"
                value={state.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="numOFTablets">Number of Tablets</label>
              <input
                type="number"
                name="numOFTablets"
                id="numOFTablets"
                className="input-box"
                placeholder="Enter the number of tablets per dosage"
                value={state.numOFTablets}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="numOfTimesPerDay">Daily Dosage</label>
              {/* <input
                type="dropdown"
                name="numOfTimesPerDay"
                id="numOfTimesPerDay"
                className="input-box"
                placeholder="Enter the name of the drug, eg. Panadol"
              /> */}
              {/* <Dropdown name="numOfTimesPerDay" className='input-box' options={options} onChange={(e) => console.log(e.value)} value={defaultOption} placeholder="Select an option" /> */}
              <select
                name="numOfTimesPerDay"
                onChange={handleChange}
                id="numOfTimesPerDay"
                className="input-box"
                placeholder="Select an option"
                value={state.numOfTimesPerDay}
              >
                <option value="" disabled hidden>
                  Select your option
                </option>
                <option value={1}>Once a day</option>
                <option value={2}>Twice daily</option>
                <option value={3}>Thrice daily</option>
                {/* <option value={state.numOfTimesPerDay}>Thrice daily</option> */}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                required
                type="date"
                name="startDate"
                id="startDate"
                className="input-box"
                onChange={handleChange}
                value={state.startDate}
              />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End Date</label>
              <input
                required
                type="date"
                name="endDate"
                id="endDate"
                className="input-box"
                onChange={handleChange}
                value={state.endDate}
              />
            </div>
            <input
              type="submit"
              value="Add Prescription"
              className="btn btn-reverse"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default AddPrescription;
