import '../CSS/Home.css'

import {useEffect, useState} from 'react'
import {Divider} from 'semantic-ui-react'
import UserAccountAdapter from '../Adapters/DBAdapter'
import Rerouters from '../Services/Rerouters'
import { connect } from 'react-redux'

import NavBar from '../Components/NavBar'
import TableSummaryBlock from '../Components/TableSummaryBlock'
import HomeMenuForm from '../Components/HomeMenuForm'

function HomePage(props){

    const [render, setRender] = useState(false);

    useEffect(() => {
        Rerouters.refreshTokenOrRerout(props.history, "/login").then((success) => {
            if(success){
                UserAccountAdapter.fetchDataTablesForUser()
                .then((body) => {
                    props.setUserTables(body)
                })
                setRender(true)
            }
        })
    }, [])

    const handleNewTable = () => {

    }

    return render ? (
        <>
        <NavBar history={props.history}/>
        <div id="home-page-wrapper">
            <div className="home-menu-bar">
                <h1>Welcome to Cashkeeper!</h1>
                <h2>Your one-stop-shop for financial history tracking</h2>
                <Divider/>
                <HomeMenuForm/>
            </div>
            <div className="home-table-bar">
                <h3>DataTables</h3>
                <Divider/>
                <TableSummaryBlock history={props.history}/>
            </div>
        </div>
        </>
    ) : null
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)