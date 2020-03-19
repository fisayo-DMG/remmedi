import React, {useState} from "react";

const SignUp = ({signup}) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, dateOfBirth, email, password} = state;
    const user = {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password
    }
    signup(user)
  }
  return (
    // <div>
    //     <h3>Register</h3>
    //     <label>Username
    //         <input type='text' />
    //     </label>
    //     <label>Password
    //         <input type='password' />
    //     </label>
    // </div>

    <>
      <section id="add" className="container">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
          <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="input-box"
                placeholder="Enter your first name"
                value={state.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="input-box"
                placeholder="Enter your last name"
                value={state.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="startDate">Date of Birth</label>
              <input
                required
                type="date"
                name="dateOfBirth"
                id="startDate"
                className="input-box"
                value={state.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-box"
                placeholder="Enter your email address"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="numOFTablets">Password</label>
              <input
                type="password"
                name="password"
                id="numOFTablets"
                className="input-box"
                placeholder="Enter password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-reverse"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
