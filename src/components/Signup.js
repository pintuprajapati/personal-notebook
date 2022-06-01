import React , { useState }from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [signupCreds, setSignupCreds] = useState({name: "", email: "", password: ""});
    const navigate = useNavigate();

    const handleSignupClick = async (e) => {
        e.preventDefault(); // It will not let page reload for every update.

        // API Call
        const url = "http://localhost:5000/api/auth/createuser";
        const { name, email, password } = signupCreds; // Destructuring
        const response = await fetch(url, {            
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }) 
            // body: JSON.stringify({ name: signupCreds.name, email: signupCreds.email, password: signupCreds.password }) 
        });
        
        const json = await response.json();
        // console.log(json);

        if(json.success) {
            // Save the tokoen and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Invalid Inputs", "danger");
        }        
    }
    const onChange = (e) => {
        setSignupCreds({...signupCreds, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <div className='container mt-3'>
            <h2>Create an account to continue to CloudNotebook</h2>
            <form onSubmit={handleSignupClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange}  placeholder="Enter your name" name="name" minLength={3} required />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter your Last Name" name="lastName" />
                </div> */}
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} placeholder="Enter your email" name="email" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" autoComplete="on" className="form-control" placeholder="Enter your password" id="password" onChange={onChange} name="password" minLength={5} required />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm your Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password again" id="cpassword" onChange={onChange} name="cpassword" value={signupCreds.cpassword} disabled={signupCreds.cpassword !== signupCreds.password } minLength={5} required />
                </div> */}

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            </div>
        </div>
    )
}

export default Signup