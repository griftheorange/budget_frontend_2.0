import TableSummaryCard from './TableSummaryCard'
import {connect} from 'react-redux'

function TableSummaryBlock(props){
    return (
        <div className="data-tables-block">
        {props.userTables.length === 0 ? <div className="message">No tables for your profile</div> : (
            <>
            <div className="header segment">
                <div className="column">Name</div>
                <div className="column"># Entries</div>
                <div className="column">Account</div>
                <div className="column">Current Balance</div>
                <div className="column">Seed Balance</div>
            </div>
            {props.userTables.map((table) => {
                return (
                    <TableSummaryCard table={table} key={table.tableName}/>
                )
            })}
            </>
        )}
        </div>
    )
}

function mapStateToProps(state){
    return {
        userTables:state.userTables
    }
}

export default connect(mapStateToProps)(TableSummaryBlock)