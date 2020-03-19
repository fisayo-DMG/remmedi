import React, {useState} from 'react'

const SignIn = ({login}) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

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
    const user = {
      email: state.email,
      password: state.password
    }
    login(user);
  }
    return (
        // <div>
        //     <h3>Login</h3>
        //     <label>Username
        //         <input type='text' name='username' />
        //     </label>
        //     <label>Password
        //         <input type='password' name='password' />
        //     </label>
        // </div>

        <>
      <section id="add" className="container">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="signinName">Username</label>
              <input
                type="text"
                name="email"
                id="signinName"
                className="input-box"
                placeholder="Enter your email as your username"
                value={state.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="signinPassword">Password</label>
              <input
                type="password"
                name="password"
                id="signinPassword"
                className="input-box"
                placeholder="Enter password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-reverse"
            />
          </form>
        </div>
      </section>
    </>
    )
}

export default SignIn
