import {Button, Icon} from 'semantic-ui-react'
import {useState} from 'react'

import DBAdapter from '../Adapters/DBAdapter'

export default function(props){

    const [newAccountName, setNewAccountName] = useState("")
    const [newAccountBalance, setNewAccountBalance] = useState(0)

    const handleAddAccount = () => {
        if(newAccountName.trim() === "" || newAccountBalance < 0){
            console.log("Invalid Input")
        } else {
            DBAdapter.fetchAddAccount(props.tableName, newAccountName, newAccountBalance)
            .then((response) => {
                if(response.Success){
                    props.setAddAccountSidebarView(false);
                    setNewAccountName("");
                    setNewAccountBalance(0);
                    props.refreshTableEntries();
                    props.refreshAccountDetails();
                } else {
                    console.log(response)
                }
            })
        }
    }

    return (
        <>
        <Icon className="sidebar-close" name="delete" color="red" size="large"
                onClick={() => {props.setAddAccountSidebarView(false)}}/>
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
        </>
    )
}