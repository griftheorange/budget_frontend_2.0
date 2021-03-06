import {Icon, Confirm} from 'semantic-ui-react'
import {useState} from 'react'
import {connect} from 'react-redux'
import DBAdapter from '../Adapters/DBAdapter'

function TableSummaryCard(props){


    const [editing, setEditing] = useState(false);
    const [nameValue, setNameValue] = useState(props.table.tableName);
    const [openConfirm, setOpenConfirm] = useState(false);

    const refreshUserTables = () => {
        DBAdapter.fetchDataTablesForUser()
        .then((body) => {
            props.setUserTables(body)
        })
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            DBAdapter.fetchChangeDataTableName(props.table.tableName, nameValue)
            .then((status) => {
                if(status.Success){
                    refreshUserTables()
                } else {
                    setNameValue(props.table.tableName)
                    setEditing(false)
                }
            })
        }
    }

    const handleDeleteTable = () => {
        DBAdapter.fetchDeleteTable(nameValue)
        .then((response) => {
            if(response.Success){
                refreshUserTables()
            } else {
                console.log(response.Error)
            }
        })
    }

    const handleDownloadBackup = (e) => {
        e.stopPropagation()
        DBAdapter.downloadBackup(nameValue)
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            let today = new Date()
            a.download = `${nameValue}-backup-${today.getFullYear()}_${today.getMonth()+1}_${today.getDate()}.xlsx`
            console.log(a.download)
            a.click();
            window.URL.revokeObjectURL(url)
        })
    }

    const handleTableRouting = (tableName) => {
        props.history.push(`/table/${tableName}`)
    }

    return (
        <>
        <Confirm open={openConfirm}
                 header={`Delete ${nameValue}?`}
                 content={`Are you sure you want to delete this table? Deletions cannot be reversed.`}
                 onCancel={() => {setOpenConfirm(false)}}
                 onConfirm={handleDeleteTable}/>
        <div className="data-table-card segment" onClick={() => {handleTableRouting(props.table.tableName)}}>
            <Icon name="download" className="download-button" color="grey" onClick={handleDownloadBackup}/>
            <div className="table-name column">
                <div className="entry-options">
                    <Icon name="edit" color="grey" onClick={(e) => {
                        e.stopPropagation()
                        setNameValue(props.table.tableName)
                        setEditing(!editing)
                    }}/>
                    <Icon name="delete" color="red" onClick={(e) => {
                        e.stopPropagation()
                        setOpenConfirm(true)
                    }}/>
                </div>
                {editing ? (
                    <input value={nameValue} onClick={(e) => {e.stopPropagation()}} onChange={(e) => {setNameValue(e.target.value)}} onKeyDown={handleKeyDown}/>
                ) : props.table.tableName}
            </div>
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
                type:"SET_FETCHED_USER_TABLES",
                content:tables
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSummaryCard)