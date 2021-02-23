import {Icon} from 'semantic-ui-react'
import {useState} from 'react'
import {connect} from 'react-redux'
import DBAdapter from '../Adapters/DBAdapter'

function TableSummaryCard(props){


    const [editing, setEditing] = useState(false);
    const [nameValue, setNameValue] = useState(props.table.tableName);

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            DBAdapter.fetchChangeDataTableName(props.table.tableName, e.target.value)
            .then((status) => {
                if(status.Success){
                    DBAdapter.fetchDataTablesForUser()
                    .then((body) => {
                        props.setUserTables(body)
                    })
                } else {
                    setNameValue(props.table.tableName)
                    setEditing(false)
                }
            })
        }
    }

    return (
        <>
        <div className="data-table-card segment">
            <div className="table-name column"><Icon name="edit" color="grey" onClick={() => {
                setNameValue(props.table.tableName)
                setEditing(!editing)
            }}/> {editing ? (
                <input value={nameValue} onChange={(e) => {setNameValue(e.target.value)}} onKeyDown={handleKeyDown}/>
            ) : props.table.tableName}</div>
            <div className="number-entries column">{props.table.numberOfEntries}</div>
            <div className="accounts column">
                {Object.entries(props.table.accounts).map(([key, value]) => {
                    return (
                        <div className="account-name">{key}</div>
                    )
                })}
            </div>
            <div className="current-balances column">
                {Object.entries(props.table.accounts).map(([key, value]) => {
                    return (
                        <div className="account-balance">${value.currentBalance}</div>
                    )
                })}
            </div>
            <div className="seed-balances column">
                {Object.entries(props.table.accounts).map(([key, value]) => {
                    return (
                        <div className="account-seed">${value.seedBalance}</div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return {
        setUserTables:(tables) => {
            dispatch({
                type:"SET_USER_TABLES",
                content:tables
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSummaryCard)