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
    
    const [selectedMenu, setSelectedMenu] = useState("accounts");

    const [categorySidebarView, setCategorySidebarView] = useState(false);
    const [addAccountSidebarView, setAddAccountSidebarView] = useState(false);
    const [editCategorySelectedRow, setEditCategorySelectedRow] = useState(null);
    

    const refreshAccountDetails = () => {
        DBAdapter.fetchAccountsDetailsForTable(tableName)
        .then((result) => {
            if(result.Success){
                props.setAccountDetails(result.Success)
            } else { props.setAccountDetails([]) }
        })
    }

    const refreshTableEntries = () => {
        DBAdapter.fetchTableData(tableName)
        .then((response) => {
            if(response.Error){
                console.error(`Error in fetch: ${response.Error[0]}`)
            } else {
                props.setTableEntries({...response, 'Date':response.Date.map((date) => {
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
                props.setDataTableCategories(response.Success.sort())
            }
        })
    }

    const refreshLineConfig = () => {
        ChartSupportFunctions.generateLineConfig(props.tableEntries)
        .then((config) => {
            props.setLineConfig(config)
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
        if(props.tableEntries){
            refreshLineConfig()
        }
    }, [props.tableEntries])

    const handleCategoryUpdate = (selectedCategory) => {
        DBAdapter.fetchPatchEntryCategory(tableName,
                                          props.tableEntries['Transaction Name'][editCategorySelectedRow],
                                          props.tableEntries['Date'][editCategorySelectedRow],
                                          props.tableEntries['Type'][editCategorySelectedRow] === "" ? null : props.tableEntries['Type'][editCategorySelectedRow],
                                          props.tableEntries['Amount'][editCategorySelectedRow],
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
                return <Charts/>
            case "chart settings":
                return <div>Chart Settings</div>
            case "accounts":
                return <Accounts tableName={tableName} 
                                 setAddAccountSidebarView={setAddAccountSidebarView}
                                 refreshAccountDetails={refreshAccountDetails}
                                 refreshTableEntries={refreshTableEntries}
                                 refreshLineConfig={refreshLineConfig}/>
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
                                    editCategorySelectedRow={editCategorySelectedRow}
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
                    {props.tableEntries ? <DataTable setCategorySidebarView={setCategorySidebarView} setEditCategorySelectedRow={setEditCategorySelectedRow}/> : null}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        tableEntries:state.tableEntries,
        dataTableCategories:state.dataTableCategories,
        accountDetails:state.accountDetails,
        lineConfig:state.lineConfig
    }
}

function mapDispatchToProps(dispatch){
    return {
        setTableEntries:(entries) => {
            dispatch({
                type:"SET_TABLE_ENTRIES",
                content:entries
            })
        },
        setDataTableCategories:(categories) => {
            dispatch({
                type:"SET_DATA_TABLE_CATEGORIES",
                content:categories
            })
        },
        setAccountDetails:(details) => {
            dispatch({
                type:"SET_ACCOUNT_DETAILS",
                content:details
            })
        },
        setLineConfig:(lineConfig) => {
            dispatch({
                type:"SET_LINE_CONFIG",
                content:lineConfig
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePage)