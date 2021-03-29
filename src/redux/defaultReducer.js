let initialState = {
    fetchedUserTables:[],
    tableFilterString:"",
    tableEntries:null,
    dataTableCategories:null,
    accountDetails:[],
    lineConfig:null
}

export default function(state = initialState, action){
    switch (action.type){
        case "SET_FETCHED_USER_TABLES":
            return {...state, fetchedUserTables:action.content}
        case "SET_FILTER_STRING":
            return {...state, tableFilterString:action.content}
        case "SET_TABLE_ENTRIES":
            return {...state, tableEntries:action.content}
        case "SET_DATA_TABLE_CATEGORIES":
                return {...state, dataTableCategories:action.content}
        case "SET_ACCOUNT_DETAILS":
            return {...state, accountDetails:action.content}
        case "SET_LINE_CONFIG":
            return {...state, lineConfig:action.content}
        default:
            return state;
    }
}