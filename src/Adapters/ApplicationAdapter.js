export default class ApplicationAdaptor {
    static shutdown(){
        fetch('http://localhost:8080/shutdown', {
            method:'POST'
        })
    }
}