import React from "react"
import PropTypes from "prop-types"

const Login = (props) => {
  return (
    <div className="login-container">
      <nav className="login">
        <h2>authorization</h2>
        <p>Enter login and pass your account GitHub</p>
        <button className="github" onClick={() => props.authenticate()}>
          Log in
        </button>
      </nav>
    </div>
  )
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
}

export default Login
