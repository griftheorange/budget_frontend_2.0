import UserAccountAdapter from '../Adapters/UserAccountAdapter'

export default function(renderSetter, history, route){
    UserAccountAdapter.validateAndRefreshToken().then((success) => {
        if(success){
            renderSetter(true);
        } else {
            renderSetter(false);
            history.push(route);
        }
    }).catch((error) => {
        history.push("/error")
        return Promise.reject("Error in token validation, could not connect to server")
    })
}