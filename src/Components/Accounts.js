import {useEffect, useState} from 'react'

import DBAdapter from '../Adapters/DBAdapter'
import {Table, Icon} from 'semantic-ui-react'

import '../CSS/Accounts.css'

export default function(props){

    const handleAddAccount = () => {
        props.setAddAccountSidebarView(true)
    }

    const handleDeleteAccount = (account) => {
        console.log("Deleting: ", account)
    }

    return (
        <div className='accounts-display-wrapper'>
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
                                <Table.Cell><Icon name='edit' color='grey'/><Icon name='delete' color='red' onClick={() => {handleDeleteAccount(account)}}/></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}