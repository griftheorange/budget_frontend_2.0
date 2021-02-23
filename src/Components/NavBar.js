import ApplicationAdapter from '../Adapters/ApplicationAdapter'
import {Icon} from 'semantic-ui-react'

export default function(props){

    const handleLogout = () => {
        window.localStorage.removeItem("id")
        window.localStorage.removeItem("token")
        props.history.push("/login")
    }

    const handleShutdown = () => {
        ApplicationAdapter.shutdown()
    }

    const handleProfile = () => {

    }

    return (
        <div className="navbar">
            <div><a>Home</a></div>|
            <div><a onClick={handleLogout}>Logout</a></div>|
            <div><a onClick={handleShutdown}>Shutdown Server</a></div>|
            <div><a onClick={handleProfile}><Icon name="user circle"/>{window.localStorage.getItem("id")}</a></div>
        </div>
    )
}