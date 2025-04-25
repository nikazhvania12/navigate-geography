import { useState } from "react";
import '../ComponentStyles/login.css'
import { Button } from "react-bootstrap";
import LoginUser from "../../Controllers/Users/LoginUser";
import { useNavigate } from 'react-router-dom';

function Login({ SetError, setCurrentUser }) {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();

    async function Login() {
        const user = await LoginUser(loginUsername, loginPassword, SetError);
        setCurrentUser(user);

        if(user)
            navigate('/');
    }

    return (
        <>
            <div className="login-container">
            </div>
                <div className="login-card">
                    <div className="login-title-container">
                        <h3>Log in to Your Account</h3>
                    </div>
                    <div className="login-inputs-container">
                    <div className="input-group mb-3">
                        <span className="input-group-text login-icon" type="email" id="basic-addon1">
                            <i className="bi bi-envelope-at-fill"></i>
                        </span>
                        <input placeholder="Email" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} 
                            className="form-control login-input login-input" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text login-icon" id="basic-addon1">
                            <i className="bi bi-shield-fill-check"></i>
                        </span>
                        <input placeholder="Password" value={loginPassword} type="password" onChange={(e) => setLoginPassword(e.target.value)} 
                        className="form-control login-input login-input" />  
                    </div> 
                    </div>
                    <div className="login-btn-container">
                        <Button variant="btn btn-success" onClick={() => Login()} className="login-btn">Log In</Button>
                    </div>
                </div>
            </>
    )
}

export default Login;