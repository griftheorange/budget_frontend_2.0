import {useState} from 'react'

import DBAdapter from '../Adapters/DBAdapter'
import {Table, Icon, Confirm} from 'semantic-ui-react'

import '../CSS/Accounts.css'

export default function(props){

    const [openConfirm, setOpenConfirm] = useState(null);

    const handleAddAccount = () => {
        props.setAddAccountSidebarView(true)
    }

    const handleDeleteAccount = (account) => {
        DBAdapter.fetchDeleteAccount(props.tableName, account.accountName)
        .then((response) => {
            if(response.Success){
                setOpenConfirm(null)
                props.refreshAccountDetails()
                props.refreshTableEntries()
            } else {
                console.log(response)
            }
        })
    }

    return (
        <div className='accounts-display-wrapper'>
            <Confirm open={openConfirm}
                 header={openConfirm ? `Delete ${openConfirm.accountName}?` : null}
                 content={`Are you sure you want to delete this account? Deletions cannot be reversed.`}
                 onCancel={() => {setOpenConfirm(null)}}
                 onConfirm={() => {handleDeleteAccount(openConfirm)}}/>
            <div className='content-title'>
                <div className='title-split'>
                    <h3>Accounts for "{props.tableName}"</h3>
                </div>
                <div className='title-split'>
                    <div><h4 onClick={handleAddAccount}><Icon name='plus' color='#556f8ade' id='blue-icon'/>Add Account</h4></div>
                </div>
            </div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Seed Balance</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.accountDetails.map((account) => {
                        return (
                            <Table.Row key={account.accountName}>
                                <Table.Cell>{account.accountName}</Table.Cell>
                                <Table.Cell>{account.seedBalance}</Table.Cell>
                                <Table.Cell><Icon name='edit' color='grey'/><Icon name='delete' color='red' onClick={() => {setOpenConfirm(account)}}/></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}