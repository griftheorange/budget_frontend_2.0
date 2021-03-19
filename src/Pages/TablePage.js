import NavBar from '../Components/NavBar'
import '../CSS/Table.css'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Sidebar, Icon, Dimmer, SidebarPusher} from 'semantic-ui-react'
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
            <Sidebar.Pushable>
                <Sidebar visible={categorySidebarView} 
                        animation="overlay" 
                        vertical
                        direction='left'>
                    <Icon className="sidebar-close" name="delete" color="red" size="large"
                        onClick={() => {setCategorySidebarView(null)}}/>
                    <h3>Select Category</h3>
                    <h5>Index of </h5>
                </Sidebar>
                <Sidebar.Pusher dimmed={categorySidebarView}>
                    <NavBar history={props.history}/>
                    <div className="table-page-content-wrapper">
                        <div className="chart-menu-display">

                        </div>
                        <div className="table-display">
                            {tableEntries ? <DataTable tableData={tableEntries} setCategorySidebarView={setCategorySidebarView}/> : null}
                        </div>
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
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