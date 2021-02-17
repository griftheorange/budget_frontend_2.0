import UserAccountAdapter from '../Adapters/UserAccountAdapter'

export default function(renderSetter, history){
    UserAccountAdapter.validateAndRefreshToken().then((success) => {
        if(success){
            renderSetter(true);
        } else {
            renderSetter(false);
            history.push("/login");
        }
    })
}