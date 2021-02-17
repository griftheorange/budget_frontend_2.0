import {useState} from 'react'

import UserAccountInterface from '../Interfaces/UserAccountInterface'

export default function(){

    const [username, setUsername] = useState("griffinpoole5@gmail.com");
    const [password, setPassword] = useState("secret");

    const handleSubmit = () => {
        UserAccountInterface.login(username, password)
    }

    return (
        <div id="login-form">
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