import Properties from '../Services/ApplicationProperties'

export default class ApplicationAdaptor {
    static shutdown(){
        fetch(`${Properties.apiURL}/shutdown`, {
            method:'POST'
        })
    }
}