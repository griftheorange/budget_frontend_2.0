import Properties from '../Services/ApplicationProperties'

export default class UserAccountAdaptor {

    static handleErrors(response){
        if(!response.ok){
            throw Error(response.statusText)
        }
        return response
    }

    static updateSessionStorage(body){
        if(body.Success){
            window.localStorage.setItem("id", body.id)
            window.localStorage.setItem("token", body.token)
            return true;
        } else {
            window.localStorage.removeItem("id")
            window.localStorage.removeItem("token")
            return false;
        }
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
        .then(this.updateSessionStorage)
    }

    static register(userEmail, password){
        return fetch(`${Properties.apiURL}/user/register`, {
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
        .then(this.updateSessionStorage)
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
        .then(this.updateSessionStorage)
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

    static fetchAddDataTable(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/data-table/add-table`, {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'token':token,
                'tableName':tableName
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
    }

    static fetchAddSeededDataTable(file){
        let data = new FormData();
        data.append("id", window.localStorage.getItem("id"));
        data.append("token", window.localStorage.getItem("token"));
        data.append("file", file);
        return fetch(`${Properties.apiURL}/file/upload-seed`, {
            method:"POST",
            body: data
        })
        .then(response => response.json())
        .catch((error) => {
            console.error(error)
        })
    }

    static fetchDeleteTable(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/data-table/${tableName}`, {
            method:"DELETE",
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

    static downloadBackup(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/file/download-backup`, {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'token':token,
                'tableName':tableName
            })
        })
        .then(this.handleErrors)
        .then(response => response.blob())
    }

    static fetchTableData(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/data-table/${tableName}`, {
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

    static fetchTableCategories(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/category/${tableName}`, {
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

    static fetchPatchEntryCategory(tableName, transactionName, date, type, amount, updatedType){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/category/edit-category`, {
            method:"PATCH",
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'id':id,
                'token':token,
                'tableName':tableName,
                'transactionName':transactionName,
                'date':date,
                'type':type,
                'amount': amount,
                'newCategory':updatedType
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
    }

    static fetchAccountsDetailsForTable(tableName){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/account/get-table-accounts`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'tableName':tableName,
                'id':id,
                'token':token
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
    }

    static fetchAddAccount(tableName, accountName, seedBalance){
        let id = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        return fetch(`${Properties.apiURL}/account/add-account`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'dataTableName':tableName,
                'accountName':accountName,
                'seedBalance':seedBalance,
                'id':id,
                'token':token
            })
        })
        .then(this.handleErrors)
        .then(response => response.json())
    }
}