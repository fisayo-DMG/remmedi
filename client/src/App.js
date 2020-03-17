import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { data } from "./data";
import Header from './components/Header';
import PrescriptionsList from './components/PrescriptionsList'
import AddPrescription from './components/AddPrescription'
import { Route, Switch } from "react-router-dom";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);

  const addPrescription = (prescription) => {
    setPrescriptions((prev) => {
      return [prescription, ...prev]
    })
  }

  useEffect(() => {
    setPrescriptions(data)
  }, [])
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={props => <PrescriptionsList data={prescriptions}  /> } />
        {/* <Route exact path='/' component={PrescriptionsList} /> */}
        <Route path='/add' component={props => <AddPrescription addPrescription={addPrescription} /> } />
      </Switch>
    </div>
  );
}

export default App;
