import NavBar from '../Components/NavBar'
import '../CSS/Table.css'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Sidebar, Icon, Button, List} from 'semantic-ui-react'
import DataTable from '../Components/DataTable'
import DBAdapter from '../Adapters/DBAdapter'

function TablePage(props){

    const [dataTableCategories, setDataTableCategories] = useState(null);
    const [tableEntries, setTableEntries] = useState(null);
    const [categorySidebarView, setCategorySidebarView] = useState(false);
    const [editCategorySelectedRow, setEditCategorySelectedRow] = useState(null);
    const {tableName} = useParams();

    const refreshTableEntries = () => {
        DBAdapter.fetchTableData(tableName)
        .then((response) => {
            if(response.Error){
                console.error(`Error in fetch: ${response.Error[0]}`)
            } else {
                setTableEntries({...response, 'Date':response.Date.map((date) => {
                    let dateObj = new Date(date)
                    return `${dateObj.getFullYear()}-${dateObj.getMonth() < 10 ? '0'+(dateObj.getMonth()+1): dateObj.getMonth()+1}-${dateObj.getDate() < 10 ? '0'+dateObj.getDate() : dateObj.getDate()}`
                })})
            }
        })
    }

    const refreshTableCategories = () => {
        DBAdapter.fetchTableCategories(tableName)
        .then((response) => {
            if(response.Error){
                console.error(`Error in fetch:  ${response.Error[0]}`)
            } else {
                setDataTableCategories(response.Success.sort())
            }
        })
    }

    useEffect(() => {
        refreshTableEntries()
        refreshTableCategories()
    }, [])

    const handleCategoryUpdate = (selectedCategory) => {
        DBAdapter.fetchPatchEntryCategory(tableName,
                                          tableEntries['Transaction Name'][editCategorySelectedRow],
                                          tableEntries['Date'][editCategorySelectedRow],
                                          tableEntries['Type'][editCategorySelectedRow] === "" ? null : tableEntries['Type'][editCategorySelectedRow],
                                          tableEntries['Amount'][editCategorySelectedRow],
                                          selectedCategory)
        .then((result) => {
            if(result.Success){
                refreshTableEntries()
                setEditCategorySelectedRow(null);
                setCategorySidebarView(false)
            }
            else {
                console.error("Error in category edit")
            }
        })
    }

    return (
        <div className="table-page-wrapper">
            <Sidebar.Pushable>
                <Sidebar visible={categorySidebarView} 
                        animation="overlay" 
                        vertical="true"
                        direction='right'>
                    <Icon className="sidebar-close" name="delete" color="red" size="large"
                        onClick={() => {setCategorySidebarView(null)}}/>
                    <h3>{tableEntries ? tableEntries['Transaction Name'][editCategorySelectedRow] : null}</h3>
                    <List>
                        {dataTableCategories ? dataTableCategories.map((category) => {
                            return (
                                <List.Item key={category}><Button onClick={() => {handleCategoryUpdate(category)}}>{category}</Button></List.Item>
                            )
                        }) : null}
                    </List>
                </Sidebar>
                <Sidebar.Pusher dimmed={categorySidebarView}>
                    <NavBar history={props.history}/>
                    <div className="table-page-content-wrapper">
                        <div className="chart-menu-display">

                        </div>
                        <div className="table-display">
                            {tableEntries ? <DataTable tableData={tableEntries} setCategorySidebarView={setCategorySidebarView} setEditCategorySelectedRow={setEditCategorySelectedRow}/> : null}
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