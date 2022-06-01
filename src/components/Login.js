import React , { useState }from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    /// Will redirect to signup page
    const handleSignupRedirectClick = () => {
        navigate("/signup");
    }

    const handleLoginClick = async (e) => {
        e.preventDefault(); // It will not let page reload for every update. 

        // API Call
        const url = "http://localhost:5000/api/auth/login";        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();

        if(json.success) {
            // Save the authtokena and redirect
            localStorage.setItem('token', json.authtoken); // Saving login token into localstorage
            props.showAlert("Logged In successfully", "success");
            navigate("/");            
        }
        else props.showAlert("Login with correct credentials", "warning");
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <div className='container mt-3'>
            <h2>Login to continue to CloudNotebook</h2>
            <form onSubmit={handleLoginClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" autoComplete='on ' className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                <div className="form-text my-5">
                    <h5>Dont' have an account? </h5>
                    <h5><button onClick={handleSignupRedirectClick} type="submit" className="btn btn-success">SignUp</button> Here</h5>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login