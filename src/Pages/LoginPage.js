import {useState} from 'react'

import UserAccountInterface from '../Interfaces/UserAccountInterface'

export default function(){

    const [username, setUsername] = useState("griffinpoole5@gmail.com");
    const [password, setPassword] = useState("secret");
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = () => {
        UserAccountInterface.login(username, password).then((response) => {
            if(response.Success){
                window.localStorage.setItem("id", response.id)
                window.localStorage.setItem("token", response.token)
            } else {
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("token")
                setErrorMsg(response.Error);
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