import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {

  let navigate = useNavigate();
  // When pressed on Logout button -> It will delete the auth-token from localstorage and redirect user to login page
  const handleLogoutClick = (e) => {
    e.preventDefault(); // It will not let page reload for every update. 

    localStorage.removeItem('token');
    props.showAlert("You have been logged out", "success");
    navigate("/login");
    
  }

  let location = useLocation(); // It will Highlight current selected menu on navbar
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CloudNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/aboout" ? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>

      {/* If localstorage doesn't have auth-token then it will show login-signup options and If auth-token is avaliable then it will show logout*/}
      {!localStorage.getItem('token') ? 
        <form className="d-flex">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
            <Link className="btn btn-primary mx-2" to="/login" role="button">LogIn</Link>
            <Link className="btn btn-success mx-2" to="/signup" role="button">SignUp</Link>
        </form> : <button onClick={handleLogoutClick} className='btn btn-primary'> Logout </button>
      }
    </div>
  </div>
</nav>
  )
}

export default Navbar