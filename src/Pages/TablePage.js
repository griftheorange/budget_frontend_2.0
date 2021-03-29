import NavBar from '../Components/NavBar'
import '../CSS/Table.css'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

import Charts from '../Components/Charts'
import Accounts from '../Components/Accounts'
import DataTable from '../Components/DataTable'
import DBAdapter from '../Adapters/DBAdapter'
import ChartSupportFunctions from '../Services/ChartSupportFunctions'
import Rerouters from '../Services/Rerouters'
import FastSidebar from '../Components/FastSidebar'
import NewAccountForm from '../Forms/NewAccountForm'
import CategoryUpdateForm from '../Forms/CategoryUpdateForm'

function TablePage(props){

    const {tableName} = useParams();
    const [lineConfig, setLineConfig] = useState(null)

    const [selectedMenu, setSelectedMenu] = useState("accounts");

    const [dataTableCategories, setDataTableCategories] = useState(null);
    const [tableEntries, setTableEntries] = useState(null);
    const [accountDetails, setAccountDetails] = useState([]);

    const [categorySidebarView, setCategorySidebarView] = useState(false);
    const [addAccountSidebarView, setAddAccountSidebarView] = useState(false);
    const [editCategorySelectedRow, setEditCategorySelectedRow] = useState(null);
    

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

    useEffect(() => {
        if(tableEntries){
            setLineConfig(ChartSupportFunctions.generateLineConfig(tableEntries))
        }
    }, [tableEntries])

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

    const getChartMenuContent = () => {
        switch(selectedMenu){
            case "charts":
                return lineConfig ? <Charts lineConfig={lineConfig}/> : null
            case "chart settings":
                return <div>Chart Settings</div>
            case "accounts":
                return <Accounts tableName={tableName} 
                                 accountDetails={accountDetails} 
                                 setAddAccountSidebarView={setAddAccountSidebarView}
                                 refreshAccountDetails={refreshAccountDetails}
                                 refreshTableEntries={refreshTableEntries}/>
            case "categories":
                return <div>Categories</div>
            case "table":
                return <div>Table</div>
        }
    }

    return (
        <div className="table-page-wrapper">
            <FastSidebar visible={categorySidebarView}>
                <CategoryUpdateForm setCategorySidebarView={setCategorySidebarView}
                                    tableEntries={tableEntries}
                                    editCategorySelectedRow={editCategorySelectedRow}
                                    dataTableCategories={dataTableCategories}
                                    handleCategoryUpdate={handleCategoryUpdate}/>
            </FastSidebar>
            <FastSidebar visible={addAccountSidebarView}>
                <NewAccountForm tableName={tableName}
                                setAddAccountSidebarView={setAddAccountSidebarView}
                                refreshAccountDetails={refreshAccountDetails}
                                refreshTableEntries={refreshTableEntries}/>
            </FastSidebar>
            <NavBar history={props.history}/>
            <div className="table-page-content-wrapper">
                <div className="chart-menu-display">
                    <div className="chart-menu-selector">
                        <div className={selectedMenu === "accounts" ? "option selected" : "option"} onClick={() => {setSelectedMenu("accounts")}}>
                            <div><Icon name="dollar"  color="grey" size="large"/>Accounts</div>
                        </div>
                        <div className={selectedMenu === "charts" ? "option selected" : "option"} onClick={() => {setSelectedMenu("charts")}}>
                            <div><Icon name="chart pie" color="grey" size="large"/>Charts</div>
                        </div>
                        <div className={selectedMenu === "chart settings" ? "option selected" : "option"} onClick={() => {setSelectedMenu("chart settings")}}>
                            <div><Icon name="settings"  color="grey" size="large"/>Chart Settings</div>
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