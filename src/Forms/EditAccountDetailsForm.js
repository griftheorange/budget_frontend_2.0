import {Icon, Divider} from 'semantic-ui-react'
import {useState, useEffect} from 'react'

import DBAdapter from '../Adapters/DBAdapter'

function EditAccountDetailsForm(props){

    const [accountRelationships, setAccountRelationships] = useState({})

    useEffect(() => {
        DBAdapter.fetchAccountCategoryRelationships(props.tableName, props.account.accountName)
        .then(console.log)
    }, [])

    return (
        <div className='edit-account-form-wrapper'>
            <Icon className="sidebar-close" name="delete" color="red" size="large"
                onClick={() => {props.setEditAccountSidebarView(null)}}/>
            <h3>Edit Account "{props.account.accountName}"</h3>
            <Divider/>
        </div>
    )
}

export default EditAccountDetailsForm