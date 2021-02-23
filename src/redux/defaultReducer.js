let initialState = {
    userTables:[]
}

export default function(state = initialState, action){
    switch (action.type){
        case "SET_USER_TABLES":
            return {...state, userTables:action.content}
        default:
            return state;
    }
}