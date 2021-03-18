import NavBar from '../Components/NavBar'
import '../CSS/Table.css'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import DataTable from '../Components/DataTable'
import DBAdapter from '../Adapters/DBAdapter'

function TablePage(props){

    const [dataTableCategories, setDataTableCategories] = useState(null);
    const [tableEntries, setTableEntries] = useState(null);
    const [categorySidebarView, setCategorySidebarView] = useState(false);
    const {tableName} = useParams();


    useEffect(() => {
        DBAdapter.fetchTableData(tableName)
        .then((response) => {
            if(response.Error){
                console.error(`Error in fetch: ${response.Error[0]}`)
            } else {
                setTableEntries({...response, 'Date':response.Date.map((date) => {
                    let dateObj = new Date(date)
                    return `${dateObj.getFullYear()}-${dateObj.getMonth() < 10 ? '0'+(dateObj.getMonth()+1): dateObj.getMonth()}-${dateObj.getDate() < 10 ? '0'+dateObj.getDate() : dateObj.getDate()}`
                })})
            }
        })
        DBAdapter.fetchTableCategories(tableName)
        .then((response) => {
            if(response.Error){
                console.error(`Error in fetch:  ${response.Error[0]}`)
            } else {
                setDataTableCategories(response.Success)
            }
        })
    }, [])

    return (
        <div className="table-page-wrapper">
            <NavBar history={props.history}/>
            <div className="table-page-content-wrapper">
                <div className="chart-menu-display">

                </div>
                <div className="table-display">
                    {tableEntries ? <DataTable tableData={tableEntries} tableCategories={dataTableCategories}/> : null}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {}
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePage)