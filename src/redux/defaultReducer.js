let initialState = {
    fetchedUserTables:[],
    tableFilterString:""
}

export default function(state = initialState, action){
    switch (action.type){
        case "SET_FETCHED_USER_TABLES":
            return {...state, fetchedUserTables:action.content}
        case "SET_FILTER_STRING":
            return {...state, tableFilterString:action.content}
        default:
            return state;
    }
}