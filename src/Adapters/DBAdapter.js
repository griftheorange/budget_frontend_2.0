import Properties from '../Services/ApplicationProperties'

export default class UserAccountAdaptor {

    static handleErrors(response){
        if(!response.ok){
            throw Error(response.statusText)
        }
        return response
    }

    static login(userEmail, password){
        return fetch(`${Properties.apiURL}/user/login`, {
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
        })
    }

    static validateAndRefreshToken(){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/user/refresh-token`, {
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
        })
    }

    static fetchDataTablesForUser(){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/data-table/index`, {
            method:"POST",
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
    }

    static fetchChangeDataTableName(tableName, newName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/data-table/${tableName}`, {
            method:"PUT",
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'token':token,
                'newName':newName
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
    }
}