import {useState} from 'react'

import UserAccountAdapter from '../Adapters/UserAccountAdapter'
export default function(){

    const [username, setUsername] = useState("griffinpoole5@gmail.com");
    const [password, setPassword] = useState("secret");
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = () => {
        UserAccountAdapter.login(username, password).then((success) => {
            if(!success){
                setErrorMsg("Invalid credentials");
                setShowError(true);
            }
        })
    }

    return (
        <div id="login-form" className="form">
            {showError ? <div className="error-message">{errorMsg}</div> : null}
            <div className="form-field">
                <label htmlFor="username-input">Username:</label>
                <input id="username-input" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            </div>
            <div className="form-field">
                <label htmlFor="password-input">Password:</label>
                <input id="password-input" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}