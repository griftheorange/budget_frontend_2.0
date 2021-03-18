import TableSummaryCard from './TableSummaryCard'
import {connect} from 'react-redux'

function TableSummaryBlock(props){
    return (
        <div className="data-tables-block">
        {props.fetchedUserTables.length === 0 ? <div className="message">No tables for your profile</div> : (
            <>
            <div className="header segment">
                <div className="column">Name</div>
                <div className="column"># Entries</div>
                <div className="column">Account</div>
                <div className="column">Current Balance</div>
                <div className="column">Seed Balance</div>
            </div>
            {props.fetchedUserTables.filter((table)=>{return table.tableName.toLowerCase().includes(props.tableFilterString.toLowerCase())}).map((table) => {
                return (
                    <TableSummaryCard table={table} key={table.tableName} history={props.history}/>
                )
            })}
            </>
        )}
        </div>
    )
}

function mapStateToProps(state){
    return {
        fetchedUserTables:state.fetchedUserTables,
        tableFilterString:state.tableFilterString
    }
}

export default connect(mapStateToProps)(TableSummaryBlock)