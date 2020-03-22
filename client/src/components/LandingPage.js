import React, {useEffect} from "react";
import { Link } from "react-router-dom";
// import "../LandingPage.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Route, Switch } from "react-router-dom";

const LandingPage = ({login, signup}) => {

  useEffect(() => {
console.log('LANDING PAGE')
  }, [])
  return (
    // <div className='container'>
    //   <SignIn />
    //   <SignUp />
    // </div>
    <>
      <section id="add" className="container">
        <div className="form-wrap">
        <h2>
        <Link to="/">
          <i className="fas fa-prescription-bottle-alt"></i> RemMedi
        </Link>
      </h2>
          <header className="inner">
            <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
          {/* <Route exact path='/' component={SignIn} /> */}
          <Route
          exact
          path="/"
          component={props => (
            <SignIn
              login={login}
            />
          )}
        />
        <Route
          exact
          path="/register"
          component={props => (
            <SignUp
              signup={signup}
            />
          )}
        />
          {/* <Route exact path='/register' component={SignUp} /> */}
          {/* <SignIn />
          <SignUp /> */}
          </Switch>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
