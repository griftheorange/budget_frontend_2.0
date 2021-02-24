let initialState = {
    userTables:[],
    filterReducer:{}
}

export default function(state = initialState, action){
    switch (action.type){
        case "SET_USER_TABLES":
            return {...state, userTables:action.content}
        case "SET_FILTER_REDUCER":
            return {...state, filterReducer:action.content}
        default:
            return state;
    }
}