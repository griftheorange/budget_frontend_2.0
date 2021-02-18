export default class UserAccountAdaptor {

    static handleErrors(response){
        if(!response.ok){
            throw Error(response.statusText)
        }
        return response
    }

    static login(userEmail, password){
        return fetch('http://localhost:8080/user/login', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'userEmail':userEmail,
                'password':password
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then((body) => {
            if(body.Success){
                window.localStorage.setItem("id", body.id)
                window.localStorage.setItem("token", body.token)
                return true;
            } else {
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("token")
                return false;
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    static validateAndRefreshToken(){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch('http://localhost:8080/user/refresh-token', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'token':token
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
        .then((body) => {
            if(body.Success){
                window.localStorage.setItem("id", body.id)
                window.localStorage.setItem("token", body.token)
                return true;
            } else {
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("token")
                return false;
            }
        }).catch((error) => {
            console.log(error)
            return Promise.reject()
        })
    }
}