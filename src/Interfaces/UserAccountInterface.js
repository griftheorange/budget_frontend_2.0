export default class UserAccountInterface {
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
        }).then(response => response.json())
    }
}