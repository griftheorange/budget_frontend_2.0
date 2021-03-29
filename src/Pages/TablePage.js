import NavBar from '../Components/NavBar'
import '../CSS/Table.css'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Sidebar, Icon, Button, List} from 'semantic-ui-react'

import Charts from '../Components/Charts'
import Accounts from '../Components/Accounts'
import DataTable from '../Components/DataTable'
import DBAdapter from '../Adapters/DBAdapter'
import Rerouters from '../Services/Rerouters'

function TablePage(props){

    const [dataTableCategories, setDataTableCategories] = useState(null);
    const [tableEntries, setTableEntries] = useState(null);
    const [accountDetails, setAccountDetails] = useState([]);
    const [categorySidebarView, setCategorySidebarView] = useState(false);
    const [addAccountSidebarView, setAddAccountSidebarView] = useState(false);
    const [editCategorySelectedRow, setEditCategorySelectedRow] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState("accounts");
    const [newAccountName, setNewAccountName] = useState("");
    const [newAccountBalance, setNewAccountBalance] = useState(0.0);
    const {tableName} = useParams();

    const refreshAccountDetails = () => {
        DBAdapter.fetchAccountsDetailsForTable(tableName)
        .then((result) => {
            if(result.Success){
                setAccountDetails(result.Success)
            } else { setAccountDetails([]) }
        })
    }

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
        Rerouters.refreshTokenOrRerout(props.history, "/login").then((success) => {
            if(success){
                refreshTableEntries()
                refreshTableCategories()
            }
        })
        refreshTableEntries()
        refreshTableCategories()
        refreshAccountDetails()
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

    const handleAddAccount = () => {
        if(newAccountName.trim() === "" || newAccountBalance < 0){
            console.log("Invalid Input")
        } else {
            DBAdapter.fetchAddAccount(tableName, newAccountName, newAccountBalance)
            .then((response) => {
                if(response.Success){
                    setAddAccountSidebarView(false);
                    setNewAccountName("");
                    setNewAccountBalance(0);
                    refreshTableEntries();
                    refreshAccountDetails();
                } else {
                    console.log(response)
                }
            })
        }
    }

    const getChartMenuContent = () => {
        switch(selectedMenu){
            case "charts":
                return <Charts tableEntries={tableEntries}/>
            case "chart settings":
                return <div>Chart Settings</div>
            case "accounts":
                return <Accounts tableName={tableName} accountDetails={accountDetails} setAddAccountSidebarView={setAddAccountSidebarView}/>
            case "categories":
                return <div>Categories</div>
            case "table":
                return <div>Table</div>
        }
    }

    return (
        <div className="table-page-wrapper">
            <Sidebar.Pushable>
                <Sidebar visible={categorySidebarView} 
                        animation="overlay" 
                        vertical="true"
                        direction='right'>
                    <Icon className="sidebar-close" name="delete" color="red" size="large"
                        onClick={() => {setCategorySidebarView(false)}}/>
                    <h3>{tableEntries ? tableEntries['Transaction Name'][editCategorySelectedRow] : null}</h3>
                    <List>
                        {dataTableCategories ? dataTableCategories.map((category) => {
                            return (
                                <List.Item key={category}><Button onClick={() => {handleCategoryUpdate(category)}}>{category}</Button></List.Item>
                            )
                        }) : null}
                    </List>
                </Sidebar>
                <Sidebar visible={addAccountSidebarView} 
                        animation="overlay" 
                        vertical="true"
                        direction='right'>
                    <Icon className="sidebar-close" name="delete" color="red" size="large"
                        onClick={() => {setAddAccountSidebarView(false)}}/>
                    <h3>Add Account</h3>
                    <table className="sidebar-form">
                        <tbody>
                            <tr>
                                <td><label htmlFor='new-account-name'>Name: </label></td>
                                <td><input id='new-account-name' value={newAccountName} onChange={(e) => {setNewAccountName(e.target.value)}}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='new-account-balance'>Seed Balance: </label></td>
                                <td><input id='new-account-balance' type='number' value={newAccountBalance} onChange={(e) => {setNewAccountBalance(Math.round(e.target.value*100)/100)}}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <Button color='blue' onClick={handleAddAccount}>Submit</Button>
                </Sidebar>
                <Sidebar.Pusher dimmed={categorySidebarView || addAccountSidebarView}>
                    <NavBar history={props.history}/>
                    <div className="table-page-content-wrapper">
                        <div className="chart-menu-display">
                            <div className="chart-menu-selector">
                                <div className={selectedMenu === "charts" ? "option selected" : "option"} onClick={() => {setSelectedMenu("charts")}}>
                                    <div><Icon name="chart pie" color="grey" size="large"/>Charts</div>
                                </div>
                                <div className={selectedMenu === "chart settings" ? "option selected" : "option"} onClick={() => {setSelectedMenu("chart settings")}}>
                                    <div><Icon name="settings"  color="grey" size="large"/>Chart Settings</div>
                                </div>
                                <div className={selectedMenu === "accounts" ? "option selected" : "option"} onClick={() => {setSelectedMenu("accounts")}}>
                                    <div><Icon name="dollar"  color="grey" size="large"/>Accounts</div>
                                </div>
                                <div className={selectedMenu === "categories" ? "option selected" : "option"} onClick={() => {setSelectedMenu("categories")}}>
                                    <div><Icon name="sort amount down"  color="grey" size="large"/>Categories</div>
                                </div>
                                <div className={selectedMenu === "table" ? "option selected" : "option"} onClick={() => {setSelectedMenu("table")}}>
                                    <div><Icon name="th list"  color="grey" size="large"/>Table</div>
                                </div>
                            </div>
                            <div className="chart-menu-content">
                                {getChartMenuContent()}
                            </div>
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