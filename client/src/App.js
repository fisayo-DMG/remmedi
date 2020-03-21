import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { data } from "./data";
import Header from "./components/Header";
import PrescriptionsList from "./components/PrescriptionsList";
import AddPrescription from "./components/AddPrescription";
import LandingPage from "./components/LandingPage";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

function App() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState('data');

  // Properties of userData are userId and email

  useEffect(() => {
    if (localStorage.getItem('remmediUserToken')) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false)
    }
  }, [])

  const login = async (user) => {
    console.log('LOG IN')
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    try {
      const res = await axios.post(
        "/api/v1/users/login", user, config
      );
      if(res.data.status === 'success'){
        localStorage.setItem('remmediUserToken', res.data.token);
        console.log(res.data, "USER DATA" );
        setUserData(res.data.userData)
        setAuthenticated(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const signup = async (user) => {
    console.log('SIGN IN');
    const config = {
      headers:{
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        "/api/v1/users/signup", user, config
      );
      login({
        email: user.email,
        password: user.password
      })
    } catch (err) {
      console.log(err);
    }
  }

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("remmediUserToken");
    return <Redirect to='/' />
  }

  const addPrescription = async presc => {
    const prescription = {...presc, userID: userData.userId, email: userData.email}
    const config = {
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('remmediUserToken')
      }
    };
    console.log(prescription);
    try {
      const res = await axios.post(
        "/api/v1/prescriptions",
        prescription,
        config
      );
      console.log("Hello");
      // setPrescriptions((prev) => {
      //   return [...prev, res.data.data]
      // })
      getPrescriptions();
    } catch (err) {
      // setError(err.response.data.error);
      console.log("err");
    }
  };

  async function getPrescriptions() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('remmediUserToken')
      }
    };
    try {
      const res = await axios.get(`/api/v1/prescriptions/${userData.userId}`);
      setPrescriptions(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  // async function completeDosage(id) {
  //   try {
  //     const res = await axios.patch(`/api/v1/prescriptions/${id}`)
  //     console.log('complete dosage')
  //     getPrescriptions();
  //   } catch (err) {
  //     console.log(err, 'NOT complete dosage')
  //   }
  // }

  async function completeDosage(id) {
    const test = {
      id: id,
      completedDosage: !prescriptions.find(p => p._id === id).completedDosage
    };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        `/api/v1/prescriptions/update`,
        test,
        config
      );
      console.log("complete dosage");
      getPrescriptions();
    } catch (err) {
      console.log(err, "NOT complete dosage");
    }
  }

  // This should be in PrescriptionList
  // useEffect(() => {
  //   getPrescriptions();
  // }, []);

  if (!authenticated) {
    return (
      <div>
        <LandingPage login={login} signup={signup}/>
      </div>
    );
  }
  return (
    <div>
      <Header logout={logout} />
      <Switch>
        <Route
          exact
          path="/"
          component={props => (
            <PrescriptionsList
            userData={userData}
              data={prescriptions}
              completeDosage={completeDosage}
              getPrescriptions={getPrescriptions}
            />
          )}
        />
        {/* <Route exact path='/' component={PrescriptionsList} /> */}
        <Route
          path="/add"
          component={props => (
            <AddPrescription addPrescription={addPrescription} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
