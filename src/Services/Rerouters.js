import DBAdapter from '../Adapters/DBAdapter'

export default class Rerouters {
    
    //Attempts to validate and refresh a users token. In the event of invalid token, will clear tokens and rerout to provided url. On success, refreshes token
    //On connection error routes to error page
    static refreshTokenOrRerout(history, route){
        return DBAdapter.validateAndRefreshToken().then((success) => {
            if(!success){
                history.push(route);
            }
            return success
        }).catch((error) => {
            history.push('/error')
            return Promise.reject("Error in token validation, could not connect to server")
        })
    }

    //Attempts user login fetch, if successful, routes to home page. On failure routes to error page and rejects promise
    static loginOrRerout(userEmail, password, history){
        return DBAdapter.login(userEmail, password).then((success) => {
            if(success){
                history.push("/")
            }
            return success
        }).catch((error) => {
            history.push("/error")
            return Promise.reject("Error in login attempt, could not connect to server")
        })
    }
}