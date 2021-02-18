import ApplicationAdapter from '../Adapters/ApplicationAdapter'

export default function(props){

    const handleLogout = () => {
        window.localStorage.removeItem("id")
        window.localStorage.removeItem("token")
        props.history.push("/login")
    }

    const handleShutdown = () => {
        ApplicationAdapter.shutdown()
    }

    return (
        <div className="navbar">
            <div><a>Home</a></div>
            <div><a onClick={handleLogout}>Logout</a></div>
            <div><a onClick={handleShutdown}>Shutdown Server</a></div>
        </div>
    )
}